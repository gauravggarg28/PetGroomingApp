#!/bin/bash

# Script to help get Render backend URL

echo "🔍 Finding your Render backend URL..."
echo ""
echo "Your Render services should be at: https://dashboard.render.com"
echo ""
echo "To find your backend URL:"
echo "1. Go to https://dashboard.render.com"
echo "2. Click on your web service (should be named something like 'pet-grooming-api')"
echo "3. Look for the URL in the service details (e.g., https://pet-grooming-api.onrender.com)"
echo ""
read -p "Enter your Render backend URL (or press Enter to skip): " render_url

if [ -n "$render_url" ]; then
    # Remove trailing slash if present
    render_url=$(echo "$render_url" | sed 's:/*$::')
    echo ""
    echo "✅ Backend URL: $render_url"
    echo ""
    
    # Test if the backend is accessible
    echo "🧪 Testing backend connection..."
    if curl -s -o /dev/null -w "%{http_code}" "$render_url/api/services" | grep -q "200\|404"; then
        echo "✅ Backend is accessible!"
    else
        echo "⚠️  Backend might not be ready yet, but we'll proceed anyway"
    fi
    
    # Create .env.production
    cd client
    cat > .env.production << EOF
VITE_API_URL=$render_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EOF
    echo "✅ Created client/.env.production with backend URL"
    echo ""
    echo "⚠️  Don't forget to add your Google Maps API key to .env.production"
    echo ""
    export RENDER_URL="$render_url"
else
    echo "⚠️  No URL provided. You'll need to create .env.production manually."
    echo "   See EXECUTE_DEPLOYMENT.md for instructions"
fi

