@echo off
REM Team Task Manager - Complete Setup & Deployment Script (Windows)
REM This script will initialize git, commit code, and prepare for deployment

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║   Team Task Manager - Git Setup Script (Windows)              ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Step 1: Check Git Installation
echo [1/6] Checking Git installation...
git --version >nul 2>&1
if errorlevel 1 (
    echo Error: Git is not installed. Please install Git first.
    pause
    exit /b 1
)
echo ✓ Git is installed
echo.

REM Step 2: Initialize Git Repository
echo [2/6] Initializing Git repository...
if exist ".git" (
    echo Git repository already exists
) else (
    git init
    echo ✓ Git repository initialized
)
echo.

REM Step 3: Configure Git
echo [3/6] Configuring Git...
git config user.name "Team Task Manager Developer"
git config user.email "developer@teamtaskmanager.local"
echo ✓ Git configured
echo.

REM Step 4: Add all files to git
echo [4/6] Staging all files...
git add .
echo ✓ Files staged
echo.

REM Step 5: Create initial commit
echo [5/6] Creating initial commit...
git commit -m "Initial commit: Team Task Manager - Full Stack Application"
echo ✓ Initial commit created
echo.

REM Step 6: Create main branch
echo [6/6] Setting up main branch...
git branch -M main
echo ✓ Main branch ready
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ✓ Git Setup Complete!
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Next Steps:
echo 1. Create a GitHub repository at https://github.com/new
echo 2. Copy the repository URL
echo 3. Run the following command:
echo.
echo    git remote add origin ^<YOUR_GITHUB_REPO_URL^>
echo.
echo 4. Then push to GitHub:
echo.
echo    git push -u origin main
echo.
echo 5. For deployment to Railway:
echo.
echo    Follow DEPLOYMENT.md for step-by-step instructions
echo.
pause
