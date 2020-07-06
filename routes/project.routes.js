const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { check } = require('express-validator');

// api/projects
// Create project
router.post('/',
  authMiddleware.isAuthenticated,
  [
    check('name', 'Project name required').not().isEmpty()
  ],
  projectController.createProject
);

// Get projects for a given user
router.get('/', 
  authMiddleware.isAuthenticated, 
  projectController.getProjects
);

// Update project
router.put('/:id',
  authMiddleware.isAuthenticated,
  [
    check('name', 'Project name required').not().isEmpty()
  ],
  projectController.updateProject
);

// Delete project
router.delete('/:id',
  authMiddleware.isAuthenticated,
  projectController.deleteProject
);

module.exports = router;