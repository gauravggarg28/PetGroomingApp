#!/bin/bash

# Automated Deployment Script
# This script will deploy your frontend to GitHub Pages

set -e

echo "🚀 Automated Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Get Render backend URL
echo -e "${YELLOW}Step 1: Backend Configuration${NC}"
echo ""

# Check if .env.production already exists
if [ -f "client/.env.production" ]; then
    echo "✅ Found existing .env.production"
    BACKEND_URL=$(grep VITE_API_URL client/.env.production | cut -d '=' -f2)
    if [ -n "$BACKEND_URL" ] && [ "$BACKEND_URL" != "https://your-backend-url.onrender.com" ]; then
        echo "✅ Backend URL already configured: $BACKEND_URL"
    else
        echo "⚠️  Backend URL needs to be configured"
        BACKEND_URL=""
    fi
else
    BACKEND_URL=""
fi

# If no valid backend URL, ask for it
if [ -z "$BACKEND_URL" ]; then
    echo ""
    echo "To find your Render backend URL:"
    echo "1. Go to https://dashboard.render.com"
    echo "2. Click on your web service"
    echo "3. Copy the URL (e.g., https://pet-grooming-api.onrender.com)"
    echo ""
    read -p "Enter your Render backend URL: " BACKEND_URL
    
    if [ -z "$BACKEND_URL" ]; then
        echo -e "${RED}❌ Backend URL is required. Exiting.${NC}"
        exit 1
    fi
    
    # Remove trailing slash
    BACKEND_URL=$(echo "$BACKEND_URL" | sed 's:/*$::')
    
    # Test backend
    echo ""
    echo "🧪 Testing backend connection..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/services" || echo "000")
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "404" ]; then
        echo -e "${GREEN}✅ Backend is accessible!${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not verify backend (HTTP $HTTP_CODE). Continuing anyway...${NC}"
    fi
    
    # Create .env.production
    echo ""
    echo "📝 Creating .env.production..."
    cd client
    
    # Check for Google Maps API key
    if [ -f ".env" ]; then
        MAPS_KEY=$(grep VITE_GOOGLE_MAPS_API_KEY .env | cut -d '=' -f2 || echo "")
    else
        MAPS_KEY=""
    fi
    
    if [ -z "$MAPS_KEY" ]; then
        read -p "Enter your Google Maps API Key (or press Enter to skip): " MAPS_KEY
        MAPS_KEY=${MAPS_KEY:-your_google_maps_api_key_here}
    fi
    
    cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
VITE_GOOGLE_MAPS_API_KEY=$MAPS_KEY
EOF
    
    echo -e "${GREEN}✅ Created .env.production${NC}"
    cd ..
fi

# Step 2: Push to GitHub (if needed)
echo ""
echo -e "${YELLOW}Step 2: Pushing to GitHub${NC}"
echo ""

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 Committing changes..."
    git add -A
    git commit -m "Prepare for deployment" || echo "No new changes to commit"
fi

# Try to push (might need authentication)
echo "📤 Pushing to GitHub..."
if git push origin main 2>&1 | grep -q "Device not configured\|Authentication failed"; then
    echo -e "${YELLOW}⚠️  GitHub authentication required${NC}"
    echo "Please run: git push origin main"
    echo "Use your Personal Access Token as the password"
else
    echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
fi

# Step 3: Build frontend
echo ""
echo -e "${YELLOW}Step 3: Building Frontend${NC}"
echo ""

cd client

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔨 Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Step 4: Deploy to GitHub Pages
echo ""
echo -e "${YELLOW}Step 4: Deploying to GitHub Pages${NC}"
echo ""

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

echo "🚀 Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo "📋 Final Step: Enable GitHub Pages"
    echo "1. Go to: https://github.com/gauravggarg28/PetGroomingApp/settings/pages"
    echo "2. Under 'Source', select 'gh-pages' branch"
    echo "3. Click 'Save'"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://gauravggarg28.github.io/PetGroomingApp/"
    echo ""
    echo "⏱️  It may take 1-2 minutes for the site to be accessible"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    exit 1
fi

