const mongoose = require('mongoose');
const { TASK_STATUS, TASK_PRIORITY } = require('../config/constants');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      default: TASK_PRIORITY.MEDIUM,
    },
    dueDate: Date,
    completedAt: Date,
    attachments: [String],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isOverdue: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Populate references
taskSchema.pre(/^find/, function (next) {
  this.populate('project', 'name')
    .populate('assignee', 'name email avatar')
    .populate('reporter', 'name email avatar')
    .populate('comments.author', 'name avatar');
  next();
});

// Check if task is overdue
taskSchema.pre('save', function (next) {
  if (this.dueDate && this.status !== TASK_STATUS.COMPLETED) {
    this.isOverdue = new Date(this.dueDate) < new Date();
  } else {
    this.isOverdue = false;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
