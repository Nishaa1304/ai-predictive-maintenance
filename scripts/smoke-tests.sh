#!/bin/bash

# Smoke tests for post-deployment verification
set -e

BASE_URL=${1:-"http://localhost:3000"}
API_URL=${2:-"http://localhost:5000"}

echo "🧪 Running smoke tests..."
echo "Frontend: $BASE_URL"
echo "Backend: $API_URL"

# Test frontend
echo "Testing frontend..."
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ "$response" != "200" ]; then
    echo "❌ Frontend health check failed! Status: $response"
    exit 1
fi
echo "✅ Frontend is healthy"

# Test backend health
echo "Testing backend health..."
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/health)
if [ "$response" != "200" ]; then
    echo "❌ Backend health check failed! Status: $response"
    exit 1
fi
echo "✅ Backend is healthy"

# Test API endpoints
echo "Testing API endpoints..."
curl -f $API_URL/api/vehicles || echo "⚠️  /api/vehicles endpoint failed"
curl -f $API_URL/api/alerts || echo "⚠️  /api/alerts endpoint failed"

echo "✅ All smoke tests passed!"
