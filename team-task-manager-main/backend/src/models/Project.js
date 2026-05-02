const mongoose = require('mongoose');
const { ROLES } = require('../config/constants');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: Object.values(ROLES),
          default: ROLES.MEMBER,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'archived', 'completed'],
      default: 'active',
    },
    startDate: Date,
    endDate: Date,
    color: {
      type: String,
      default: '#3B82F6',
    },
  },
  { timestamps: true }
);

// Populate members
projectSchema.pre(/^find/, function (next) {
  this.populate('owner', 'name email avatar');
  this.populate('members.user', 'name email avatar');
  next();
});

module.exports = mongoose.model('Project', projectSchema);
