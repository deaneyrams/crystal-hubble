#!/bin/bash
# SYNTY SOVEREIGN CORE - INTELLIGENT DEPLOYMENT SCRIPT

ZONE_NAME="syntry.co"
SERVER_IP="159.65.54.149"

echo "Checking DNS Proxy Status for $ZONE_NAME..."

# 1. Check if the domain is resolving to the origin IP or a Cloudflare IP
CURRENT_RESOLVED_IP=$(dig +short $ZONE_NAME | tail -n1)

if [ "$CURRENT_RESOLVED_IP" == "$SERVER_IP" ]; then
    echo "STATUS: Direct-to-Origin (Proxy Disabled)."
    echo "ACTION: Skipping Cloudflare Purge to avoid 403 error."
else
    echo "STATUS: Proxied via Cloudflare."
    echo "ACTION: Initiating Cloudflare API Purge..."
    # Insert Cloudflare API Curl command here only if status is active
    # curl -X POST "https://api.cloudflare.com/client/v4/zones/<YOUR_ZONE_ID>/purge_cache" \
    #     -H "Authorization: Bearer <YOUR_API_TOKEN>" \
    #     -H "Content-Type: application/json" \
    #     --data '{"purge_everything":true}'
fi

# 2. Local "Clean Bake" Protocol (Always Required)
echo "Executing Local Clean Bake..."
cd /var/www/html
rm -rf .next
npm run build

# 3. Process Restart
echo "Restarting Syntry Engine..."
pm2 restart syntry-engine --update-env

echo "Deployment Complete."
