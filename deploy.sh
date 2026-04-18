#!/bin/bash

# Syntry Sovereign Deployment & Recovery Script
# Target: Dell Local Environment | Porto: 3001
# Role: Senior DevOps Engineer & Systems Architect

echo "🚀 Starting Syntry Sovereign Deployment Sequence..."

# 1. Kill Conflict
echo "🔍 Checking for port conflicts on 3001..."
PORT_PID=$(lsof -t -i:3001)
if [ ! -z "$PORT_PID" ]; then
    echo "⚔️ Killing process $PORT_PID on port 3001..."
    kill -9 $PORT_PID
fi

echo "🛑 Stopping PM2 syntry-engine..."
pm2 stop syntry-engine || true
pm2 delete syntry-engine || true

# 2. Clean State
echo "🧹 Cleaning build artifacts and cache..."
rm -rf .next
rm -rf node_modules/.cache
echo "✨ State cleared."

# 3. Resource-Optimized Build
echo "🏗️ Executing Resource-Optimized Build (Alloc: 2GB)..."
# Setting NODE_OPTIONS to prevent RAM exhaustion on Dell environment
export NODE_OPTIONS="--max-old-space-size=2048"

if npm run build; then
    echo "✅ Build Successful."
else
    echo "❌ Build Failed. Aborting Deployment."
    exit 1
fi

# 4. Process Management
echo "🚀 Starting application with PM2 on port 3001..."
# We use 'next start -p 3001' to ensure it runs on the specific institutional port
pm2 start npm --name "syntry-engine" -- start -- -p 3001

# 5. Network Handshake
echo "🤝 Performing Network Handshake (Cloudflared)..."
sudo systemctl restart cloudflared || echo "⚠️ cloudflared restart failed. Manual check required."

# 6. Verification
echo "🛡️ Verifying Network Integrity..."
sleep 5 # Wait for PM2 to stabilize
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "***************************************************"
    echo "   ✅ DEPLOYMENT SUCCESSFUL: syntry-engine LIVE   "
    echo "   PORT: 3001 | ENV: Dell Local Institutional     "
    echo "***************************************************"
else
    echo "❌ VERIFICATION FAILED: Port 3001 is not active."
    exit 1
fi
