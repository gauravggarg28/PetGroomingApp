#!/bin/bash

# Quick deployment script - pass Render URL as argument
# Usage: ./deploy-with-url.sh https://your-service.onrender.com

set -e

RENDER_URL="$1"

if [ -z "$RENDER_URL" ]; then
    echo "❌ Error: Render backend URL required"
    echo ""
    echo "Usage: ./deploy-with-url.sh https://your-service.onrender.com"
    echo ""
    echo "To find your Render URL:"
    echo "1. Go to https://dashboard.render.com"
    echo "2. Click on your web service"
    echo "3. Copy the URL shown at the top"
    exit 1
fi

# Remove trailing slash
RENDER_URL=$(echo "$RENDER_URL" | sed 's:/*$::')

echo "🚀 Deploying with backend URL: $RENDER_URL"
echo ""

# Update .env.production
cd client

# Check for existing Google Maps key
if [ -f ".env.production" ]; then
    MAPS_KEY=$(grep VITE_GOOGLE_MAPS_API_KEY .env.production | cut -d '=' -f2 || echo "your_google_maps_api_key_here")
else
    MAPS_KEY="your_google_maps_api_key_here"
fi

cat > .env.production << EOF
VITE_API_URL=$RENDER_URL
VITE_GOOGLE_MAPS_API_KEY=$MAPS_KEY
EOF

echo "✅ Updated .env.production"

# Build
echo "🔨 Building..."
npm run build

# Deploy
echo "📤 Deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Final step: Enable GitHub Pages"
echo "Go to: https://github.com/gauravggarg28/PetGroomingApp/settings/pages"
echo "Select 'gh-pages' branch and save"
echo ""
echo "🌐 Your site will be at: https://gauravggarg28.github.io/PetGroomingApp/"

