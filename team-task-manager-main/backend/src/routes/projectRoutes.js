const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} = require('../controllers/projectController');
const authenticate = require('../middleware/authenticate');
const { validate, schemas } = require('../utils/validation');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(schemas.createProject), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', validate(schemas.updateProject), updateProject);
router.delete('/:id', deleteProject);

// Members management
router.post('/:id/members', validate(schemas.addMember), addMember);
router.delete('/:id/members/:memberId', removeMember);

module.exports = router;
