#!/bin/bash

# Deployment Script for Pet Grooming App
# This script helps deploy the frontend to GitHub Pages

set -e

echo "🚀 Pet Grooming App - Deployment Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if backend URL is set
if [ -z "$BACKEND_URL" ]; then
    echo "⚠️  WARNING: BACKEND_URL environment variable is not set"
    echo ""
    echo "Before deploying, you need to:"
    echo "1. Deploy your backend to Render (or another service)"
    echo "2. Get your backend URL (e.g., https://pet-grooming-api.onrender.com)"
    echo "3. Set it as: export BACKEND_URL='https://your-backend-url.onrender.com'"
    echo ""
    read -p "Do you have a backend URL? (y/n): " has_backend
    
    if [ "$has_backend" != "y" ]; then
        echo ""
        echo "📋 Backend Deployment Steps:"
        echo "1. Go to https://render.com and sign up"
        echo "2. Click 'New +' → 'Web Service'"
        echo "3. Connect your GitHub repo: PetGroomingApp"
        echo "4. Configure:"
        echo "   - Root Directory: server"
        echo "   - Build Command: npm install"
        echo "   - Start Command: node index.js"
        echo "5. Copy the backend URL after deployment"
        echo ""
        read -p "Enter your backend URL (or press Enter to skip): " backend_url
        if [ -n "$backend_url" ]; then
            export BACKEND_URL="$backend_url"
        else
            echo "⚠️  Skipping backend URL setup. You can set it later in client/.env.production"
        fi
    else
        read -p "Enter your backend URL: " backend_url
        export BACKEND_URL="$backend_url"
    fi
fi

# Create .env.production file
if [ -n "$BACKEND_URL" ]; then
    echo ""
    echo "📝 Creating .env.production file..."
    cd client
    
    # Check if Google Maps API key is needed
    if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
        read -p "Enter your Google Maps API Key (or press Enter to skip): " maps_key
        if [ -n "$maps_key" ]; then
            export GOOGLE_MAPS_API_KEY="$maps_key"
        fi
    fi
    
    cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
VITE_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY:-your_google_maps_api_key_here}
EOF
    
    echo "✅ Created .env.production"
    cd ..
else
    echo ""
    echo "⚠️  No backend URL provided. Creating template .env.production..."
    cd client
    if [ ! -f .env.production ]; then
        cat > .env.production << EOF
VITE_API_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EOF
        echo "✅ Created .env.production template"
        echo "⚠️  Please update it with your actual backend URL before deploying"
    fi
    cd ..
fi

# Build the project
echo ""
echo "🔨 Building the project..."
cd client
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to GitHub Pages
echo ""
echo "📤 Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/gauravggarg28/PetGroomingApp/settings/pages"
    echo "2. Under 'Source', select 'gh-pages' branch"
    echo "3. Click 'Save'"
    echo "4. Your site will be live at: https://gauravggarg28.github.io/PetGroomingApp/"
    echo ""
    echo "⏱️  It may take 1-2 minutes for the site to be accessible"
else
    echo "❌ Deployment failed! Please check the errors above."
    exit 1
fi

