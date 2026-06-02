#!/usr/bin/env bash
# Refresh VERCEL_OIDC_TOKEN in .env.local without removing app keys from .env.example.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT/.env.local}"
TMP="$ROOT/.env.vercel.tmp"

if ! command -v vercel >/dev/null 2>&1; then
  echo "Error: Vercel CLI not installed. Run: npm i -g vercel"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found."
  exit 1
fi

vercel env pull "$TMP" >/dev/null
OIDC="$(grep -E '^VERCEL_OIDC_TOKEN=' "$TMP" | tail -1 || true)"
rm -f "$TMP"

if [[ -z "$OIDC" ]]; then
  echo "Error: VERCEL_OIDC_TOKEN not returned by Vercel."
  exit 1
fi

grep -v '^VERCEL_OIDC_TOKEN=' "$ENV_FILE" | grep -v '^# Created by Vercel CLI' > "${ENV_FILE}.tmp"
{
  cat "${ENV_FILE}.tmp"
  printf '\n# Created by Vercel CLI\n'
  printf '%s\n' "$OIDC"
} > "$ENV_FILE"
rm -f "${ENV_FILE}.tmp"

echo "Updated VERCEL_OIDC_TOKEN in $ENV_FILE (app keys unchanged)."
