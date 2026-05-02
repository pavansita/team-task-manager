# Backend API - Team Task Manager

A professional REST API built with Node.js, Express.js, and MongoDB for team task management.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/users` - Get all users (Admin only)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members/:memberId` - Remove member

### Tasks
- `POST /api/tasks/projects/:projectId/tasks` - Create task
- `GET /api/tasks/projects/:projectId/tasks` - Get project tasks
- `GET /api/tasks/dashboard/stats` - Get dashboard stats
- `GET /api/tasks/:taskId` - Get task by ID
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task
- `POST /api/tasks/:taskId/comments` - Add comment

## 🏗️ Architecture

### Middleware
- **authenticate.js** - JWT token verification
- **authorize.js** - Role-based access control
- **errorHandler.js** - Centralized error handling

### Models
- **User** - User accounts with roles
- **Project** - Project management
- **Task** - Task tracking

### Controllers
- **authController.js** - Authentication logic
- **projectController.js** - Project operations
- **taskController.js** - Task operations

### Utils
- **jwt.js** - JWT token generation
- **validation.js** - Input validation schemas

## 🔐 Security

- JWT authentication with token expiration
- bcryptjs password hashing (10 rounds)
- Role-based access control
- Input validation with Joi
- Helmet for HTTP security headers
- CORS configuration
- Error handling without exposing internals

## 📦 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `joi` - Schema validation
- `cors` - CORS middleware
- `helmet` - Security headers
- `dotenv` - Environment variables

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment (development/production) | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/team-task-manager |
| JWT_SECRET | Secret key for JWT signing | - |
| JWT_EXPIRE | Token expiration time | 7d |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

## 🚢 Deployment

### Docker

```bash
docker build -t task-manager-backend .
docker run -p 5000:5000 task-manager-backend
```

### Railway

```bash
railway up
```

See root README.md for detailed deployment instructions.

## 🐛 Error Handling

All errors are handled through a centralized error handler middleware. Responses include:
- HTTP status codes
- Error messages
- Validation errors (if applicable)

## 📊 Database Schema

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: admin, member)
- avatar (String)
- isActive (Boolean)
- timestamps

### Project
- name (String)
- description (String)
- owner (ObjectId -> User)
- members (Array of { user, role })
- status (String: active, archived, completed)
- startDate (Date)
- endDate (Date)
- color (String)
- timestamps

### Task
- title (String)
- description (String)
- project (ObjectId -> Project)
- assignee (ObjectId -> User)
- reporter (ObjectId -> User)
- status (String: todo, in-progress, completed, cancelled)
- priority (String: low, medium, high, urgent)
- dueDate (Date)
- completedAt (Date)
- isOverdue (Boolean)
- attachments (Array)
- comments (Array of { author, text, createdAt })
- timestamps

---

For more information, see the main README.md
