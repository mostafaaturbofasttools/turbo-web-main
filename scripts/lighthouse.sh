#!/usr/bin/env bash
# Run Lighthouse against local production server or live site.
# Usage:
#   npm run lighthouse
#   npm run lighthouse -- http://localhost:3456/

set -euo pipefail

BASE_URL="${1:-https://www.turbofasttools.com/}"
if [[ "$BASE_URL" != */ ]]; then
  BASE_URL="${BASE_URL}/"
fi

REPORT_JSON="./lighthouse-report.json"

echo "Lighthouse: ${BASE_URL}"
npx --yes lighthouse "${BASE_URL}" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path="${REPORT_JSON}" \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

node -e "
const r = require('./lighthouse-report.json');
const s = (k) => Math.round(r.categories[k].score * 100);
console.log('Scores — performance:', s('performance'), 'accessibility:', s('accessibility'), 'best-practices:', s('best-practices'), 'seo:', s('seo'));
"

echo "JSON report: ${REPORT_JSON}"
