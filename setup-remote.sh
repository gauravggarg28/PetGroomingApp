#!/bin/bash

# Script to set up remote repository and push code
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values

# Example: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

echo "Setting up remote repository..."
echo ""
echo "Please provide your GitHub repository URL:"
echo "Format: https://github.com/USERNAME/REPO_NAME.git"
echo ""
read -p "Enter repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "Error: Repository URL is required"
    exit 1
fi

# Add remote
echo "Adding remote repository..."
git remote add origin "$REPO_URL"

# Verify remote was added
echo ""
echo "Remote repositories:"
git remote -v

# Push to remote
echo ""
echo "Pushing code to remote repository..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Successfully pushed to remote repository!"
echo "Your code is now available at: $REPO_URL"

