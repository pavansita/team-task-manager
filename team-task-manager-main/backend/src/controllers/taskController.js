const Task = require('../models/Task');
const Project = require('../models/Project');
const { TASK_STATUS } = require('../config/constants');

// @route POST /api/projects/:projectId/tasks
// @desc Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, assignee, dueDate, priority } = req.validated;

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project member
    const isMember =
      project.owner.equals(req.user.userId) ||
      project.members.some(m => m.user.equals(req.user.userId));

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const task = await Task.create({
      title,
      description,
      project: req.params.projectId,
      assignee,
      reporter: req.user.userId,
      dueDate,
      priority,
    });

    await task.populate([
      { path: 'assignee', select: 'name email avatar' },
      { path: 'reporter', select: 'name email avatar' },
      { path: 'project', select: 'name' },
    ]);

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects/:projectId/tasks
// @desc Get all tasks in a project
exports.getProjectTasks = async (req, res, next) => {
  try {
    const { status, priority, assignee } = req.query;

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project member
    const isMember =
      project.owner.equals(req.user.userId) ||
      project.members.some(m => m.user.equals(req.user.userId));

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const filter = { project: req.params.projectId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    const tasks = await Task.find(filter).sort({ dueDate: 1 });

    res.json({
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/tasks/dashboard
// @desc Get dashboard data (all tasks, overdue, etc.)
exports.getDashboard = async (req, res, next) => {
  try {
    // Get all projects where user is member
    const projects = await Project.find({
      $or: [
        { owner: req.user.userId },
        { 'members.user': req.user.userId },
      ],
    });

    const projectIds = projects.map(p => p._id);

    // Get task statistics
    const allTasks = await Task.find({ project: { $in: projectIds } });
    const overdueTasks = await Task.find({
      project: { $in: projectIds },
      isOverdue: true,
      status: { $ne: TASK_STATUS.COMPLETED },
    });
    const myTasks = await Task.find({
      project: { $in: projectIds },
      assignee: req.user.userId,
    });
    const myAssignedTasks = await Task.find({
      project: { $in: projectIds },
      reporter: req.user.userId,
    });

    // Count by status
    const tasksByStatus = {
      todo: allTasks.filter(t => t.status === TASK_STATUS.TODO).length,
      inProgress: allTasks.filter(t => t.status === TASK_STATUS.IN_PROGRESS).length,
      completed: allTasks.filter(t => t.status === TASK_STATUS.COMPLETED).length,
    };

    res.json({
      stats: {
        totalProjects: projects.length,
        totalTasks: allTasks.length,
        overdueTasks: overdueTasks.length,
        myTasks: myTasks.length,
        tasksByStatus,
      },
      recentTasks: allTasks.sort((a, b) => b.createdAt - a.createdAt).slice(0, 10),
      overdueTasks: overdueTasks.slice(0, 5),
      myAssignedTasks: myAssignedTasks.slice(0, 5),
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/tasks/:taskId
// @desc Get task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    const isMember =
      project.owner.equals(req.user.userId) ||
      project.members.some(m => m.user.equals(req.user.userId));

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/tasks/:taskId
// @desc Update task
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    const isMember =
      project.owner.equals(req.user.userId) ||
      project.members.some(m => m.user.equals(req.user.userId));

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // If status is completed, set completedAt
    if (req.validated.status === TASK_STATUS.COMPLETED) {
      req.validated.completedAt = new Date();
    }

    task = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.validated,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/tasks/:taskId
// @desc Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    if (!project.owner.equals(req.user.userId)) {
      return res.status(403).json({ message: 'Only project owner can delete tasks' });
    }

    await Task.deleteOne({ _id: req.params.taskId });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/tasks/:taskId/comments
// @desc Add comment to task
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $push: {
          comments: {
            author: req.user.userId,
            text: text.trim(),
          },
        },
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Comment added successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};
