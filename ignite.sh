#!/bin/bash
# SYNTRY SOVEREIGN CORE - ATOMIC DEPLOYMENT SEQUENCE
# Authorized by Eyram Abusah, CEO of SYNTRY.

echo "🛡️ Initiating SYNTRY Sovereign Atomic Deployment..."

# 1. Clean State Initialization
echo "🧹 Executing Clean State Initialization..."
pm2 delete all 2>/dev/null || true
rm -rf .next
rm -rf node_modules/.cache

# 2. Dependency Synchronization
echo "🔄 Synchronizing Core Libraries..."
npm install

# 3. Production Build
echo "🏗️ Baking 8 Layers of Truth into Build Chunks..."
npm run build

# 4. Engine Activation
echo "🚀 Activating SYNTRY Sovereign Engine..."
# Standardized to Port 3000 as per Sovereign Directive
pm2 start npm --name "syntry-engine" -- start
pm2 save

# 5. Network Verification
echo "📡 Refreshing Nginx Gateway..."
sudo systemctl restart nginx

echo "***************************************************"
echo "   ✅ DEPLOYMENT SUCCESSFUL: SYNTRY CORE LIVE      "
echo "   PORT: 3000 | IDENTITY: SOVEREIGN INDEPENDENT    "
echo "***************************************************"
