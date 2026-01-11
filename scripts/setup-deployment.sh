#!/bin/bash

set -e

echo "🚀 Setting up automated deployment system..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create necessary directories
echo -e "${BLUE}📁 Creating directory structure...${NC}"
mkdir -p .github/workflows
mkdir -p scripts
mkdir -p tests

# Check if Git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  Git repository not initialized. Run: git init${NC}"
    read -p "Initialize Git now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git init
        echo -e "${GREEN}✅ Git initialized${NC}"
    fi
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo -e "${BLUE}📝 Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
env/

# Environment variables
.env
.env.local
.env.production

# Build outputs
.next/
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
EOF
    echo -e "${GREEN}✅ .gitignore created${NC}"
fi

# Instructions for GitHub secrets
echo -e "\n${YELLOW}📋 NEXT STEPS - Configure GitHub Secrets:${NC}"
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo ""
echo "1️⃣  Go to your GitHub repository settings:"
echo "   https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
echo ""
echo "2️⃣  Add the following secrets:"
echo ""
echo -e "${GREEN}   Vercel Secrets (Frontend):${NC}"
echo "   • VERCEL_TOKEN"
echo "   • VERCEL_ORG_ID"
echo "   • VERCEL_PROJECT_ID"
echo ""
echo -e "${GREEN}   Render Secrets (Backend):${NC}"
echo "   • RENDER_API_KEY"
echo "   • RENDER_DEPLOY_HOOK_URL"
echo ""
echo -e "${GREEN}   API Keys:${NC}"
echo "   • OPENAI_API_KEY"
echo "   • ELEVENLABS_API_KEY"
echo ""
echo -e "${GREEN}   Notifications (Optional):${NC}"
echo "   • DISCORD_WEBHOOK_URL"
echo "   • SLACK_WEBHOOK_URL"
echo ""
echo -e "${GREEN}   URLs:${NC}"
echo "   • PRODUCTION_FRONTEND_URL"
echo "   • PRODUCTION_API_URL"
echo "   • STAGING_API_URL"
echo ""

# Create health check endpoint if backend exists
if [ -f "backend_server.py" ]; then
    echo -e "${BLUE}🏥 Adding health check endpoint...${NC}"
    
    # Check if health endpoint exists
    if ! grep -q "/health" backend_server.py; then
        cat >> backend_server.py << 'EOF'

# Health check endpoint for deployment
@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    }), 200
EOF
        echo -e "${GREEN}✅ Health check endpoint added${NC}"
    else
        echo -e "${YELLOW}⚠️  Health endpoint already exists${NC}"
    fi
fi

# Create Vercel configuration
if [ -d "frontend" ]; then
    echo -e "${BLUE}⚙️  Creating Vercel configuration...${NC}"
    cat > frontend/vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@production_api_url"
  },
  "regions": ["iad1"]
}
EOF
    echo -e "${GREEN}✅ Vercel configuration created${NC}"
fi

# Create deployment status badge
echo -e "${BLUE}📛 Adding deployment badge to README...${NC}"
if [ ! -f README.md ]; then
    cat > README.md << 'EOF'
# AI Predictive Maintenance System

![Deployment Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/🚀%20Production%20Deployment/badge.svg)

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && npm install
cd .. && pip install -r requirements.txt

# Run development servers
npm run dev  # Frontend
python backend_server.py  # Backend
```

## 📦 Deployment

Automated deployment is configured using GitHub Actions:
- Push to `main` → Production deployment
- Push to `develop` → Staging deployment

## 🔧 Environment Variables

See `.env.example` for required configuration.
EOF
    echo -e "${GREEN}✅ README.md created with deployment badge${NC}"
fi

# Final instructions
echo -e "\n${GREEN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Deployment system setup complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📌 To deploy:${NC}"
echo "   1. Configure GitHub secrets (see above)"
echo "   2. git add ."
echo "   3. git commit -m 'feat: add automated deployment'"
echo "   4. git push origin main"
echo ""
echo -e "${BLUE}🎉 Your app will automatically deploy to production!${NC}"
echo ""
