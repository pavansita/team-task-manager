# Getting Started Guide

Welcome to Team Task Manager! 👋

This guide will help you set up and run the application locally.

## 📋 Prerequisites

Ensure you have installed:
- Node.js v18+ (https://nodejs.org)
- npm (comes with Node.js)
- Git
- MongoDB (for local setup) or use Railway's MongoDB

## 🚀 Option 1: Quick Start with Docker (Recommended)

### Prerequisites
- Docker Desktop installed (https://www.docker.com/products/docker-desktop)

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Project_submission

# 2. Start all services with Docker Compose
docker-compose up

# 3. Access the applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
# MongoDB: mongodb://localhost:27017

# 4. Stop services
docker-compose down
```

## 🛠️ Option 2: Manual Local Setup

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Update .env with your MongoDB URI
# Edit .env and set MONGODB_URI (local or cloud)

# 5. Start backend server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup (New Terminal)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Start development server
npm start
# App opens on http://localhost:3000
```

## ✅ Verify Installation

### Test Backend
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```

### Test Frontend
- Open http://localhost:3000 in browser
- You should see the login page

## 👤 Create First User

1. Open http://localhost:3000
2. Click "Sign up"
3. Enter details:
   - Name: Your Name
   - Email: your@email.com
   - Password: your_password
4. Click "Sign up"
5. You'll be redirected to dashboard

## 📊 Start Using the App

### Create a Project

1. Click "Projects" in navbar
2. Click "+ New Project"
3. Fill in project details
4. Click "Create Project"

### Create a Task

1. From Projects page, click on a project
2. Click "+ New Task"
3. Fill in task details
4. Assign to a team member (optional)
5. Click "Create Task"

### View Dashboard

1. Click "Dashboard" in navbar
2. View statistics and recent tasks
3. Monitor overdue tasks

## 🔧 Configuration

### Backend Environment Variables

Create `.env` in `backend/` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables

Create `.env` in `frontend/` folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 Database Setup

### Local MongoDB

```bash
# Install MongoDB Community Edition (if not installed)
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community
# Linux: Follow docs at https://docs.mongodb.com/manual/installation/

# Start MongoDB
# macOS/Linux: mongod
# Windows: net start MongoDB

# Create database (automatic on first insert)
# Database: team-task-manager
```

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in `.env`

Example:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/team-task-manager
```

## 🧪 Testing the API

See [API_TESTING.md](API_TESTING.md) for detailed API examples.

Quick test:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password"}'
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
# macOS/Linux:
lsof -i :5000

# Windows:
netstat -ano | findstr :5000

# Kill the process
# macOS/Linux:
kill -9 <PID>

# Windows:
taskkill /PID <PID> /F
```

### MongoDB Connection Error

- Check MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check network connectivity
- Verify MongoDB user credentials

### Frontend Not Connecting to Backend

- Check backend is running on correct port
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend
- Check network tab in browser DevTools

### NPM Install Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📖 Useful Commands

```bash
# Backend
cd backend
npm run dev          # Development with auto-reload
npm start            # Production mode
npm test             # Run tests
npm run lint         # Run linter

# Frontend
cd frontend
npm start            # Development server
npm run build        # Production build
npm test             # Run tests

# Docker
docker-compose up            # Start all services
docker-compose down          # Stop all services
docker-compose logs backend  # View backend logs
docker-compose logs frontend # View frontend logs
```

## 🚀 Next Steps

1. ✅ Start the application locally
2. ✅ Create a test project
3. ✅ Create test tasks
4. ✅ Invite team members
5. ✅ Test role-based features
6. ✅ Deploy to Railway (see [DEPLOYMENT.md](DEPLOYMENT.md))

## 📞 Support

- Check [README.md](README.md) for full documentation
- Review [API_TESTING.md](API_TESTING.md) for API examples
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Check logs for error details

## 🎉 Success!

If everything is running:
- ✅ Frontend accessible at http://localhost:3000
- ✅ Backend running on http://localhost:5000
- ✅ Database connected
- ✅ Ready to use!

---

Happy coding! 💻
