#!/bin/bash

# 🚀 Quick Deploy Script for YouTube Downloader
# This script helps you deploy to Railway + Vercel

echo "🎬 YouTube Downloader - Deployment Helper"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "📋 Step 1: Git Setup"
echo "-------------------"

# Check if already a git repo
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "🔧 Initializing git repository..."
    git init
    echo "✅ Git initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "⚠️  .gitignore not found (this shouldn't happen)"
fi

echo ""
echo "📦 Step 2: Prepare for Deployment"
echo "---------------------------------"

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Creating commit..."
git commit -m "Prepare for deployment - YouTube Downloader by Abhinav" || echo "No changes to commit"

echo ""
echo "✅ Your code is ready for deployment!"
echo ""
echo "🌐 Next Steps:"
echo "============="
echo ""
echo "1️⃣  Create a GitHub repository:"
echo "   → Go to https://github.com/new"
echo "   → Name it: youtube-downloader"
echo "   → Keep it public"
echo "   → DON'T initialize with README"
echo "   → Click 'Create repository'"
echo ""
echo "2️⃣  Push your code to GitHub:"
echo "   Run these commands:"
echo "   git remote add origin https://github.com/abhinavsanthoshpp/youtube_website.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  Deploy Backend to Railway:"
echo "   → Go to https://railway.app"
echo "   → Sign up with GitHub"
echo "   → New Project → Deploy from GitHub"
echo "   → Select your repository"
echo "   → Settings → Root Directory → 'backend'"
echo "   → Variables → Add: FRONTEND_URL=*"
echo "   → Copy your Railway URL"
echo ""
echo "4️⃣  Deploy Frontend to Vercel:"
echo "   → Go to https://vercel.com"
echo "   → Sign up with GitHub"
echo "   → New Project → Import your repository"
echo "   → Framework: Vite"
echo "   → Environment Variables:"
echo "     VITE_API_URL=<your-railway-url>"
echo "   → Deploy!"
echo ""
echo "5️⃣  Update Backend CORS:"
echo "   → Go back to Railway → Variables"
echo "   → Update: FRONTEND_URL=<your-vercel-url>"
echo ""
echo "🎉 That's it! Your website will be live!"
echo ""
echo "📖 For detailed instructions, check:"
echo "   → QUICK_DEPLOY.md (5-minute guide)"
echo "   → DEPLOYMENT_GUIDE.md (complete guide)"
echo ""
echo "Made by Abhinav ❤️"
