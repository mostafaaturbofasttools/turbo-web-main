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
#   - Never prints secret values to the terminal
#   - Never commit .env.local — it stays gitignored

set -euo pipefail

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

if [[ ! -d "$ROOT/.vercel" ]]; then
  echo "Linking Vercel project (one-time)..."
  (cd "$ROOT" && vercel link)
fi

declare -a ENVS
case "$TARGET" in
  production) ENVS=(production) ;;
  preview) ENVS=(preview) ;;
  development) ENVS=(development) ;;
  all) ENVS=(production preview development) ;;
  *)
    echo "Usage: $0 [production|preview|development|all]"
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

sync_key() {
  local key="$1"
  local value="$2"
  local env

  for env in "${ENVS[@]}"; do
    echo "→ $key ($env)"
    if printf '%s' "$value" | vercel env add "$key" "$env" --force >/dev/null 2>&1; then
      :
    elif printf '%s' "$value" | vercel env add "$key" "$env" >/dev/null 2>&1; then
      :
    else
      echo "  Failed to set $key for $env. Try manually: vercel env add $key $env"
      exit 1
    fi
  done
}

echo "Syncing env keys from .env.local to Vercel ($TARGET)..."
echo "(values are not printed)"
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
