#!/bin/bash
echo "🚀 Igniting Syntry Engine..."

# Pull latest code
git pull origin main

# Install dependencies and build
npm install
npm run build

# Clear port 3001 and restart via PM2
sudo fuser -k 3001/tcp
pm2 delete syntry-engine || true
pm2 start npm --name "syntry-engine" -- start -- -p 3001

echo "✅ Deployment Successful. Syntry is live on Port 3001."
