const express = require('express');
const {
  createTask,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addComment,
  getDashboard,
} = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');
const { validate, schemas } = require('../utils/validation');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Dashboard route
router.get('/dashboard/stats', getDashboard);

// Project tasks
router.post('/projects/:projectId/tasks', validate(schemas.createTask), createTask);
router.get('/projects/:projectId/tasks', getProjectTasks);

// Task specific routes
router.get('/:taskId', getTaskById);
router.put('/:taskId', validate(schemas.updateTask), updateTask);
router.delete('/:taskId', deleteTask);
router.post('/:taskId/comments', addComment);

module.exports = router;
