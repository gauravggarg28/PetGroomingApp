#!/bin/bash

# Complete Deployment Script
# This will do everything once you provide the Render URL

set -e

echo "🚀 Complete Deployment Script"
echo "=============================="
echo ""

# Get Render URL
if [ -z "$1" ]; then
    echo "Please provide your Render backend URL"
    echo ""
    echo "To find it:"
    echo "1. Go to https://dashboard.render.com"
    echo "2. Click on your web service"
    echo "3. Copy the URL (e.g., https://pet-grooming-api.onrender.com)"
    echo ""
    read -p "Enter your Render backend URL: " RENDER_URL
else
    RENDER_URL="$1"
fi

if [ -z "$RENDER_URL" ]; then
    echo "❌ Error: Render URL is required"
    exit 1
fi

# Clean URL
RENDER_URL=$(echo "$RENDER_URL" | sed 's:/*$::')

echo ""
echo "✅ Using backend URL: $RENDER_URL"
echo ""

# Update .env.production
cd client

echo "📝 Updating .env.production..."

# Check for existing Google Maps key
if [ -f ".env" ]; then
    MAPS_KEY=$(grep "^VITE_GOOGLE_MAPS_API_KEY" .env | cut -d '=' -f2- | tr -d '"' || echo "")
fi

if [ -z "$MAPS_KEY" ] && [ -f ".env.production" ]; then
    MAPS_KEY=$(grep "^VITE_GOOGLE_MAPS_API_KEY" .env.production | cut -d '=' -f2- | tr -d '"' || echo "")
fi

if [ -z "$MAPS_KEY" ] || [ "$MAPS_KEY" = "your_google_maps_api_key_here" ]; then
    read -p "Enter your Google Maps API Key (or press Enter to skip): " MAPS_KEY
    MAPS_KEY=${MAPS_KEY:-your_google_maps_api_key_here}
fi

cat > .env.production << EOF
VITE_API_URL=$RENDER_URL
VITE_GOOGLE_MAPS_API_KEY=$MAPS_KEY
EOF

echo "✅ .env.production updated"
echo ""

# Test backend
echo "🧪 Testing backend connection..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RENDER_URL/api/services" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Backend is accessible and responding!"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "⚠️  Backend accessible but /api/services endpoint not found (might be normal)"
else
    echo "⚠️  Could not verify backend (HTTP $HTTP_CODE). Continuing anyway..."
fi

echo ""

# Build
echo "🔨 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy
echo "📤 Deploying to GitHub Pages..."
echo ""
echo "⚠️  You will be prompted for GitHub credentials:"
echo "   Username: gauravggarg28"
echo "   Password: Use a Personal Access Token (not your GitHub password)"
echo ""
echo "   Get token from: https://github.com/settings/tokens"
echo "   Create new token (classic) with 'repo' scope"
echo ""

npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅"
    echo ""
    echo "📋 Final Step: Enable GitHub Pages"
    echo ""
    echo "1. Go to: https://github.com/gauravggarg28/PetGroomingApp/settings/pages"
    echo "2. Under 'Source', select 'gh-pages' branch"
    echo "3. Click 'Save'"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://gauravggarg28.github.io/PetGroomingApp/"
    echo ""
    echo "⏱️  It may take 1-2 minutes for the site to be accessible"
    echo ""
    echo "🎉 Congratulations! Your app is deployed!"
else
    echo ""
    echo "❌ Deployment failed. Please check the errors above."
    echo ""
    echo "Common issues:"
    echo "- GitHub authentication: Use Personal Access Token as password"
    echo "- Network issues: Check your internet connection"
    exit 1
fi

