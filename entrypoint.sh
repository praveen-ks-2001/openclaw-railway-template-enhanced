#!/bin/bash
set -e

if [ -z "$OPENCLAW_VERSION" ]; then
  echo "ERROR: OPENCLAW_VERSION env var is required but not set."
  exit 1
fi

INSTALLED=$(node -e "try{console.log(require('/usr/local/lib/node_modules/openclaw/package.json').version)}catch(e){console.log('')}" 2>/dev/null)
if [ "$INSTALLED" != "$OPENCLAW_VERSION" ]; then
  echo "Installing openclaw@${OPENCLAW_VERSION} (currently: ${INSTALLED:-none})..."
  npm install -g openclaw@${OPENCLAW_VERSION}
else
  echo "openclaw@${OPENCLAW_VERSION} already installed, skipping."
fi

chown -R openclaw:openclaw /data
chmod 700 /data

if [ ! -d /data/.linuxbrew ]; then
  cp -a /home/linuxbrew/.linuxbrew /data/.linuxbrew
fi

rm -rf /home/linuxbrew/.linuxbrew
ln -sfn /data/.linuxbrew /home/linuxbrew/.linuxbrew

exec gosu openclaw node src/server.js
