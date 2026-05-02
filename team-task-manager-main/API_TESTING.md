# API Testing Guide

This document provides examples for testing the Team Task Manager API endpoints.

## Base URL

- **Local:** `http://localhost:5000/api`
- **Production:** `https://your-deployed-url/api`

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Example Requests

### 1. Authentication

#### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Projects

#### Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Q1 Product Launch",
    "description": "Launch new product in Q1",
    "color": "#667eea",
    "startDate": "2024-01-01",
    "endDate": "2024-03-31"
  }'
```

#### Get All Projects

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get Project Details

```bash
curl -X GET http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Project

```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Q1 Product Launch - Updated",
    "status": "active"
  }'
```

#### Add Member to Project

```bash
curl -X POST http://localhost:5000/api/projects/PROJECT_ID/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "teammate@example.com",
    "role": "member"
  }'
```

#### Remove Member from Project

```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID/members/MEMBER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Delete Project

```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Tasks

#### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Implement login page",
    "description": "Build and style the login page",
    "priority": "high",
    "dueDate": "2024-01-15",
    "assignee": "ASSIGNEE_USER_ID"
  }'
```

#### Get Project Tasks

```bash
curl -X GET "http://localhost:5000/api/tasks/projects/PROJECT_ID/tasks?status=todo&priority=high" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Query Parameters:
- `status`: `todo`, `in-progress`, `completed`, `cancelled`
- `priority`: `low`, `medium`, `high`, `urgent`
- `assignee`: User ID

#### Get Task Details

```bash
curl -X GET http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Task

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "in-progress",
    "priority": "urgent"
  }'
```

#### Delete Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Add Comment to Task

```bash
curl -X POST http://localhost:5000/api/tasks/TASK_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "Started working on this task"
  }'
```

### 4. Dashboard

#### Get Dashboard Stats

```bash
curl -X GET http://localhost:5000/api/tasks/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response:
```json
{
  "stats": {
    "totalProjects": 5,
    "totalTasks": 23,
    "overdueTasks": 2,
    "myTasks": 8,
    "tasksByStatus": {
      "todo": 10,
      "inProgress": 8,
      "completed": 5
    }
  },
  "recentTasks": [...],
  "overdueTasks": [...],
  "myAssignedTasks": [...]
}
```

## Testing Workflow

### 1. Create Account

```bash
# Register
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }')

# Extract token
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

### 2. Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Project",
    "description": "A test project"
  }'
```

### 3. Create Task

```bash
# Replace PROJECT_ID with actual ID
curl -X POST http://localhost:5000/api/tasks/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Task",
    "description": "Test task description",
    "priority": "medium"
  }'
```

### 4. Update Task Status

```bash
# Replace TASK_ID with actual ID
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "status": "in-progress"
  }'
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "name",
      "message": "name is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Project not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Using Postman

1. Import the API collection
2. Set variable `{{TOKEN}}` to your JWT token
3. Use `{{BASE_URL}}` for API endpoint
4. Test each endpoint in sequence

## Rate Limiting

Currently, there is no rate limiting. In production, consider:
- Implementing rate limiting middleware
- Setting limits per IP or user
- Using services like Redis for tracking

## Testing Tips

- Always test with a new user account first
- Save token from login response
- Use consistent IDs for testing
- Test error cases (invalid IDs, wrong roles)
- Verify CORS headers in responses
- Test token expiration behavior

---

For more information, see README.md and DEPLOYMENT.md
