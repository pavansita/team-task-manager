const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

// @route POST /api/projects
// @desc Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate, color } = req.validated;

    const project = await Project.create({
      name,
      description,
      owner: req.user.userId,
      members: [{ user: req.user.userId, role: 'admin' }],
      startDate,
      endDate,
      color,
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects
// @desc Get all projects for the user
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.userId },
        { 'members.user': req.user.userId },
      ],
    });

    res.json({
      total: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects/:id
// @desc Get project by ID
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is member of project
    const isMember =
      project.owner.equals(req.user.userId) ||
      project.members.some(m => m.user.equals(req.user.userId));

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/projects/:id
// @desc Update project (Admin only)
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.owner.equals(req.user.userId)) {
      return res.status(403).json({ message: 'Only owner can update project' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.validated,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/projects/:id
// @desc Delete project (Admin only)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.owner.equals(req.user.userId)) {
      return res.status(403).json({ message: 'Only owner can delete project' });
    }

    await Project.deleteOne({ _id: req.params.id });
    await Task.deleteMany({ project: req.params.id });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/projects/:id/members
// @desc Add member to project
exports.addMember = async (req, res, next) => {
  try {
    const { email, role } = req.validated;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.owner.equals(req.user.userId)) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const memberExists = project.members.some(m => m.user.equals(user._id));
    if (memberExists) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    project.members.push({ user: user._id, role });
    await project.save();
    await project.populate('members.user', 'name email avatar');

    res.json({
      message: 'Member added successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/projects/:id/members/:memberId
// @desc Remove member from project
exports.removeMember = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.owner.equals(req.user.userId)) {
      return res.status(403).json({ message: 'Only owner can remove members' });
    }

    project.members = project.members.filter(
      m => !m.user.equals(req.params.memberId)
    );
    await project.save();
    await project.populate('members.user', 'name email avatar');

    res.json({
      message: 'Member removed successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};
