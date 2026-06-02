#!/usr/bin/env bash
# Sync .env.local → Vercel environment variables (production-safe).
#
# Usage:
#   npm run env:vercel              # sync to production
#   npm run env:vercel -- preview   # sync to preview only
#   npm run env:vercel -- all       # production + preview + development
#
# Prerequisites:
#   npm i -g vercel
#   vercel login
#   vercel link   (once, from repo root)
#
# Security:
#   - Reads ONLY keys listed in .env.example (no stray secrets)
#   - Never touches VERCEL_OIDC_TOKEN (Vercel CLI block at end of .env.local)
#   - Never prints secret values to the terminal
#   - Never commit .env.local — it stays gitignored
#
# Warning: `vercel env pull .env.local` overwrites the whole file. To refresh only
# VERCEL_OIDC_TOKEN, run: bash scripts/refresh-vercel-oidc.sh

set -euo pipefail

# In an interactive Mac terminal, Vercel may still prompt unless CI mode is set.
# Without this, output redirected to /dev/null looks like a hang.
export CI=1

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT/.env.local}"
ENV_EXAMPLE="$ROOT/.env.example"
TARGET="${1:-production}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found."
  echo "Copy .env.example to .env.local and fill in your values first."
  exit 1
fi

if [[ ! -f "$ENV_EXAMPLE" ]]; then
  echo "Error: $ENV_EXAMPLE not found."
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "Error: Vercel CLI not installed. Run: npm i -g vercel"
  exit 1
fi

if ! vercel whoami >/dev/null 2>&1; then
  echo "Error: Not logged in. Run: vercel login"
  exit 1
fi

# Node sync avoids Mac Terminal + bash hangs; set USE_BASH_SYNC=1 to force this script.
if [[ "${USE_BASH_SYNC:-}" != "1" ]] && command -v node >/dev/null 2>&1; then
  exec node "$ROOT/scripts/sync-env-to-vercel.mjs" "$TARGET"
fi

if [[ ! -d "$ROOT/.vercel" ]]; then
  echo "Linking Vercel project (one-time)..."
  (cd "$ROOT" && vercel link)
fi

declare -a ENVS
case "$TARGET" in
  production) ENVS=(production) ;;
  preview) ENVS=(preview) ;;
  development) ENVS=(development) ;;
  # Preview needs a git branch in the Vercel CLI — set PREVIEW_BRANCH or use the dashboard.
  all) ENVS=(production development) ;;
  *)
    echo "Usage: $0 [production|preview|development|all]"
    echo "  all = production + development (preview skipped — use dashboard or PREVIEW_BRANCH=my-branch $0 preview)"
    exit 1
    ;;
esac

read_env_value() {
  local key="$1"
  local line value
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -1 || true)"
  [[ -z "$line" ]] && return 1
  value="${line#*=}"
  # strip optional surrounding quotes
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"
  printf '%s' "$value"
}

log_indicates_success() {
  local log="$1"
  grep -qE 'Updated|Overrode|Added|Saved' "$log" 2>/dev/null
}

# Foreground Vercel + 90s timeout (background jobs often hang in Mac Terminal.app).
run_vercel_logged() {
  local log="$1"
  local stdin_file="$2"
  shift 2
  : >"$log"
  (
    cd "$ROOT" || exit 1
    if command -v perl >/dev/null 2>&1; then
      perl -e 'alarm(90); exec @ARGV' -- vercel "$@" <"$stdin_file"
    else
      vercel "$@" <"$stdin_file"
    fi
  ) >"$log" 2>&1 || true
  if grep -q 'timed out' "$log" 2>/dev/null; then
    return 1
  fi
  log_indicates_success "$log"
}

sync_key() {
  local key="$1"
  local value="$2"
  local env
  local tmp
  local log

  tmp="$(mktemp)"
  log="$(mktemp)"
  printf '%s' "$value" >"$tmp"
  trap 'rm -f "$tmp" "$log"' RETURN

  for env in "${ENVS[@]}"; do
    printf "→ %s (%s) ... " "$key" "$env"

    if [[ "$env" == "production" ]]; then
      if run_vercel_logged "$log" "$tmp" env update "$key" "$env" --yes --sensitive --non-interactive; then
        echo "ok"
        continue
      fi
      if run_vercel_logged "$log" "$tmp" env add "$key" "$env" --force --yes --sensitive --non-interactive; then
        echo "ok"
        continue
      fi
    else
      if run_vercel_logged "$log" "$tmp" env update "$key" "$env" --yes --non-interactive; then
        echo "ok"
        continue
      fi
      if run_vercel_logged "$log" "$tmp" env add "$key" "$env" --force --yes --non-interactive; then
        echo "ok"
        continue
      fi
    fi

    echo "failed"
    tail -6 "$log" 2>/dev/null || true
    echo "  Set manually in Vercel → Settings → Environment Variables"
    exit 1
  done
}

echo "Syncing env keys from .env.local to Vercel ($TARGET)..."
echo "(values are not printed; each line may take a few seconds)"
if [[ "$TARGET" == "all" ]]; then
  echo "(all = production + development; preview vars must be added in the Vercel dashboard)"
fi
echo ""

SYNCED=0
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue

  key="${line%%=*}"
  key="${key// /}"
  [[ -z "$key" ]] && continue

  if ! value="$(read_env_value "$key")"; then
    echo "⊘ skip $key (not set in .env.local)"
    continue
  fi

  if [[ -z "$value" ]]; then
    echo "⊘ skip $key (empty)"
    continue
  fi

  sync_key "$key" "$value"
  SYNCED=$((SYNCED + 1))
done < "$ENV_EXAMPLE"

echo ""
echo "Done — $SYNCED variable(s) synced."
echo "Redeploy for production to pick up changes: vercel --prod"
echo ""
echo "Required for form email notifications:"
echo "  RESEND_API_KEY, RESEND_FROM (verified domain), SUBMISSIONS_EMAIL_TO"
echo "Required for blob backup of submissions:"
echo "  AZURE_STORAGE_CONNECTION_STRING, AZURE_SUBMISSIONS_CONTAINER"
