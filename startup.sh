#!/usr/bin/env bash
# Start the app on 0.0.0.0:8080 if it is not already healthy.
set -euo pipefail
cd /workspace

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev > /tmp/solvo-dev.log 2>&1 &
disown

for i in $(seq 1 60); do
  if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
    exit 0
  fi
  sleep 0.5
done

exit 0
