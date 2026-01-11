#!/bin/bash

# Manual deployment script for local testing
set -e

echo "🚀 Starting manual deployment..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Frontend deployment
echo "📦 Building frontend..."
cd frontend
npm ci
npm run build

if [ -n "$VERCEL_TOKEN" ]; then
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod --token=$VERCEL_TOKEN
else
    echo "⚠️  VERCEL_TOKEN not set, skipping Vercel deployment"
fi

cd ..

# Backend deployment
if [ -n "$RENDER_DEPLOY_HOOK_URL" ]; then
    echo "🚀 Triggering Render deployment..."
    curl -X POST "$RENDER_DEPLOY_HOOK_URL"
else
    echo "⚠️  RENDER_DEPLOY_HOOK_URL not set, skipping backend deployment"
fi

echo "✅ Deployment complete!"
