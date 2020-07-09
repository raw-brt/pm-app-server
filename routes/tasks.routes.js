const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { check } = require('express-validator');

// api/tasks
// Create task
router.post('/', 
  authMiddleware.isAuthenticated,
  [
    check('name', 'Task name required').not().isEmpty()
  ],
  tasksController.createTask
);

// Get tasks for a given project
router.get('/',
  authMiddleware.isAuthenticated,
  tasksController.getTasks
);

// Update task
router.put('/:taskId',
  authMiddleware.isAuthenticated,
  [
    check('name', 'Task name is required').not().isEmpty()
  ],
  tasksController.updateTask
);

// Delete task
router.delete('/:taskId',
  authMiddleware.isAuthenticated,
  tasksController.deleteTask
);

module.exports = router;