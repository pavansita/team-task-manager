# 🚀 Deployment Guide

## Deployment on Railway

This guide will help you deploy the Team Task Manager application to Railway.

### Prerequisites

- Railway account (free at https://railway.app)
- GitHub account
- Git installed

### Step-by-Step Deployment

## 1. Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Create GitHub repository and push code
git add .
git commit -m "Initial commit: Team Task Manager"
git branch -M main
git remote add origin https://github.com/yourusername/team-task-manager.git
git push -u origin main
```

## 2. Set Up Railway Project

### 2.1 Create New Project on Railway

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select the repository

### 2.2 Add MongoDB Plugin

1. In Railway dashboard, click **"Add Service"**
2. Search for **"MongoDB"**
3. Click to add MongoDB plugin
4. Railway will automatically provision MongoDB

### 2.3 Configure Backend Service

1. Select your project in Railway
2. Click **"Create Service from GitHub Repo"**
3. Set **Root Directory** to `backend/`
4. Click **"Create Service"**
5. Go to service **Settings** tab
6. Add Environment Variables:

```
NODE_ENV=production
JWT_SECRET=your-very-secure-random-string-change-this
PORT=5000
```

7. Railway automatically links MongoDB URI
8. Go to **Deployments** - Railway will auto-deploy

### 2.4 Configure Frontend Service

1. Click **"Add Service"**
2. Select **"GitHub Repo"**
3. Choose your repo again
4. Set **Root Directory** to `frontend/`
5. Go to service **Settings** tab
6. Add Environment Variable:

```
REACT_APP_API_URL=https://<backend-service-url>/api
```

Replace `<backend-service-url>` with your backend service URL from Railway dashboard.

7. Click **Deploy** or wait for auto-deployment

## 3. Verify Deployment

### 3.1 Test Backend

```bash
curl https://<backend-url>/api/health
# Should return: {"status":"Server is running"}
```

### 3.2 Test Frontend

Open `https://<frontend-url>` in your browser and check:
- Login page loads
- Can register new account
- Can login
- Dashboard is accessible

## 4. Post-Deployment Configuration

### 4.1 Update Frontend Environment

If backend URL changes, update frontend environment in Railway:

1. Go to Frontend service in Railway
2. Settings → Variables
3. Update `REACT_APP_API_URL`
4. Trigger redeploy

### 4.2 Configure CORS

Update backend CORS settings if frontend URL changes:

1. Backend service → Settings → Variables
2. Update `CORS_ORIGIN` if needed
3. Save and redeploy

## 5. Monitoring

### Check Logs

1. Go to service in Railway
2. Click **"Logs"** tab
3. View real-time logs

### Check Metrics

1. Go to service
2. Click **"Metrics"** tab
3. Monitor CPU, Memory, Network usage

## 6. Troubleshooting

### Issue: Backend connection fails

**Solution:**
- Check MongoDB is running (should be auto-provided by Railway)
- Verify `MONGODB_URI` in environment variables
- Check backend logs

### Issue: Frontend shows blank page

**Solution:**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Check frontend logs in Railway

### Issue: 401 Unauthorized errors

**Solution:**
- Verify JWT_SECRET is same in backend and .env
- Check token is being saved in localStorage
- Clear browser localStorage and try again

### Issue: CORS errors

**Solution:**
- Update `CORS_ORIGIN` in backend environment
- Should match frontend URL exactly
- Restart backend service

## 7. Manual Deployment Steps (Alternative)

If auto-deployment doesn't work:

### Backend Manual Deploy

1. Go to Backend service → Deployments
2. Click **"Trigger Deploy"**
3. Wait for deployment to complete
4. Check logs

### Frontend Manual Deploy

1. Frontend service → Deployments
2. Click **"Trigger Deploy"**
3. Wait for build and deployment
4. Verify at frontend URL

## 8. Custom Domain (Optional)

1. In Railway project settings
2. Click **"Add Domain"** on the service
3. Enter your custom domain
4. Update DNS records as shown
5. Wait for SSL certificate (usually instant)

## 9. Environment Variables Reference

### Backend Variables

```env
# Server
PORT=5000
NODE_ENV=production

# Database (provided by Railway MongoDB plugin)
MONGODB_URI=mongodb://...

# Authentication
JWT_SECRET=your-production-secret-key-minimum-32-chars
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=https://your-frontend-url
```

### Frontend Variables

```env
REACT_APP_API_URL=https://your-backend-url/api
```

## 10. Scaling (Optional)

For increased traffic:

1. Go to service → Settings
2. Increase **"Replica Count"** (minimum 1)
3. Or upgrade region for better performance
4. Monitor metrics and scale as needed

## 11. Backup & Recovery

### Backup MongoDB

Railway's MongoDB plugin includes automatic backups. To backup manually:

1. Go to MongoDB service in Railway
2. Database settings → Export data
3. Save JSON export locally

### Restore Data

Contact Railway support or use MongoDB Compass to restore backups.

## 12. Security Best Practices

- ✅ Use strong JWT_SECRET (minimum 32 characters)
- ✅ Enable HTTPS (automatic with Railway)
- ✅ Use environment variables for secrets
- ✅ Never commit .env files
- ✅ Regularly update dependencies
- ✅ Monitor logs for suspicious activity

## 13. Performance Optimization

- Enable caching on frontend
- Optimize database queries
- Use MongoDB indexes
- Implement pagination for large datasets
- Monitor Railway metrics regularly

## 14. Maintenance

### Regular Tasks

- Check logs weekly
- Monitor performance metrics
- Update dependencies monthly
- Review and update security settings
- Test login/authentication regularly

### Database Maintenance

- Monitor MongoDB storage usage
- Clean up old data if needed
- Optimize indexes
- Review query performance

## Useful Links

- Railway Documentation: https://docs.railway.app
- MongoDB Documentation: https://docs.mongodb.com
- Express.js Documentation: https://expressjs.com
- React Documentation: https://react.dev

## Support

If you encounter issues:

1. Check Railway logs first
2. Review this guide
3. Check Railway documentation
4. Contact Railway support for platform issues

---

**Happy Deploying! 🚀**

For more information, see README.md
