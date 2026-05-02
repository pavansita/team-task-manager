const Joi = require('joi');

const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createProject: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500),
    startDate: Joi.date(),
    endDate: Joi.date(),
    color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  }),

  updateProject: Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().max(500),
    status: Joi.string().valid('active', 'archived', 'completed'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  }).min(1),

  createTask: Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(1000),
    assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    dueDate: Joi.date(),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  }),

  updateTask: Joi.object({
    title: Joi.string().min(2).max(200),
    description: Joi.string().max(1000),
    assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    status: Joi.string().valid('todo', 'in-progress', 'completed', 'cancelled'),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
    dueDate: Joi.date(),
  }).min(1),

  addMember: Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'member').default('member'),
  }),
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    req.validated = value;
    next();
  };
};

module.exports = { schemas, validate };
