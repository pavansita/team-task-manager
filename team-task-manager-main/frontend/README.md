# Frontend - Team Task Manager

A modern React application for managing team tasks and projects.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the App

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

App will open on `http://localhost:3000`

## 📱 Features

### Authentication
- Sign up with email and password
- Secure login
- Token-based session management
- Protected routes

### Dashboard
- Real-time statistics
- Task overview by status
- Overdue task tracking
- Project summary

### Projects
- Create and manage projects
- Add team members
- View project tasks
- Archive/complete projects

### Tasks
- Create tasks with priorities
- Assign to team members
- Track task status
- Set due dates
- Add comments
- View task details

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   ├── ProjectCard.js
│   ├── TaskCard.js
│   └── Modal.js
├── context/            # React Context providers
│   └── AuthContext.js
├── pages/              # Page components
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── DashboardPage.js
│   └── ProjectsPage.js
├── services/           # API services
│   └── api.js
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🔑 Key Components

### AuthContext
- Manages authentication state
- Login/Register/Logout functions
- Token management
- User information

### ProtectedRoute
- Wraps authenticated routes
- Redirects to login if not authenticated
- Loading state handling

### Navbar
- Navigation between pages
- User information display
- Logout functionality

### API Service
- Axios instance with interceptors
- Auto-attach JWT tokens
- Handle 401 responses
- Service methods for all endpoints

## 🎨 Styling

The app uses CSS-in-JS styling with inline styles. Each component has its own styling defined in a `<style>` tag for:
- Isolation and maintainability
- No external CSS file dependencies
- Easy component customization

Color scheme:
- Primary: `#667eea` to `#764ba2` (gradient)
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Info: `#3b82f6`

## 📦 Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing
- `axios` - HTTP client
- `date-fns` - Date formatting
- `react-icons` - Icon library

## 🔄 API Integration

All API calls are made through the `api.js` service:

```javascript
// Example usage
import { projectService } from '../services/api';

const projects = await projectService.getAll();
const newProject = await projectService.create(data);
```

### Available Services
- `authService` - Authentication
- `projectService` - Project management
- `taskService` - Task management

## 🔐 Security

- JWT tokens stored in localStorage
- Auto-attach tokens to all requests
- Handle token expiration
- Validate user authentication before rendering protected routes

## 🚢 Deployment

### Docker

```bash
docker build -t task-manager-frontend .
docker run -p 3000:3000 task-manager-frontend
```

### Railway

```bash
railway up
```

Environment variable needed:
```
REACT_APP_API_URL=https://your-backend-url/api
```

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API base URL | http://localhost:5000/api |

## 🎯 Pages

### Login Page (`/login`)
- Email and password login
- Link to register page
- Error handling

### Register Page (`/register`)
- Sign up with name, email, password
- Password confirmation
- Link to login page

### Dashboard (`/dashboard`)
- Statistics cards
- Tasks by status
- Recent tasks
- Overdue tasks

### Projects (`/projects`)
- List all projects
- Create new project modal
- Project cards with quick info
- Click to view project details

## 🔄 State Management

Using React Context API:
- `AuthContext` - Global auth state
- `useAuth()` hook for easy access

## ⚠️ Error Handling

- API errors displayed to user
- Validation errors shown in forms
- 401 errors trigger redirect to login
- Network errors handled gracefully

## 🚀 Performance Optimizations

- Lazy loading of components
- Route-based code splitting
- Efficient re-renders with React.memo (where applicable)
- Minimal state updates

## 📱 Responsive Design

- Mobile-first approach
- CSS Grid and Flexbox
- Responsive typography
- Mobile-optimized components

---

For more information, see the main README.md
