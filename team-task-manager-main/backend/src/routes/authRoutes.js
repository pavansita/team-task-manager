const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  getAllUsers,
} = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { validate, schemas } = require('../utils/validation');
const { ROLES } = require('../config/constants');

const router = express.Router();

// Public routes
router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.get('/users', authenticate, authorize(ROLES.ADMIN), getAllUsers);

module.exports = router;
