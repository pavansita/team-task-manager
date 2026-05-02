const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// @route POST /api/auth/register
// @desc Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.validated;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/login
// @desc Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.validated;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/auth/me
// @desc Get current logged in user
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/auth/profile
// @desc Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, avatar },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/auth/users
// @desc Get all users (Admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json({
      total: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};
