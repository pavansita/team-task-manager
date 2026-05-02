#!/bin/bash

# Team Task Manager - Complete Setup & Deployment Script
# This script will initialize git, commit code, and prepare for deployment

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   Team Task Manager - Git & Deployment Setup Script          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check Git Installation
echo -e "${BLUE}[1/6]${NC} Checking Git installation..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git is installed${NC}"
echo ""

# Step 2: Initialize Git Repository
echo -e "${BLUE}[2/6]${NC} Initializing Git repository..."
if [ -d ".git" ]; then
    echo -e "${YELLOW}Git repository already exists${NC}"
else
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi
echo ""

# Step 3: Configure Git (if not already configured)
echo -e "${BLUE}[3/6]${NC} Configuring Git..."
git config user.name "Team Task Manager Developer" 2>/dev/null || \
    git config --global user.name "Team Task Manager Developer"
git config user.email "developer@teamtaskmanager.local" 2>/dev/null || \
    git config --global user.email "developer@teamtaskmanager.local"
echo -e "${GREEN}✓ Git configured${NC}"
echo ""

# Step 4: Add all files to git
echo -e "${BLUE}[4/6]${NC} Staging all files..."
git add .
echo -e "${GREEN}✓ Files staged${NC}"
echo ""

# Step 5: Create initial commit
echo -e "${BLUE}[5/6]${NC} Creating initial commit..."
git commit -m "Initial commit: Team Task Manager - Full Stack Application

- Professional backend with Express.js and MongoDB
- React frontend with modern UI
- JWT authentication with role-based access
- Project and task management system
- Dashboard with analytics
- Docker support
- Railway deployment ready
- Comprehensive documentation"

echo -e "${GREEN}✓ Initial commit created${NC}"
echo ""

# Step 6: Create main branch
echo -e "${BLUE}[6/6]${NC} Setting up main branch..."
git branch -M main
echo -e "${GREEN}✓ Main branch ready${NC}"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "${GREEN}✓ Git Setup Complete!${NC}"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Create a GitHub repository at https://github.com/new"
echo "2. Copy the repository URL"
echo "3. Run the following command:"
echo ""
echo -e "${YELLOW}   git remote add origin <YOUR_GITHUB_REPO_URL>${NC}"
echo ""
echo "4. Then push to GitHub:"
echo ""
echo -e "${YELLOW}   git push -u origin main${NC}"
echo ""
echo "5. For deployment to Railway:"
echo ""
echo -e "${YELLOW}   Follow DEPLOYMENT.md for step-by-step instructions${NC}"
echo ""
