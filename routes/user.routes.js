// Routes to create users
const express = require('express');
const router  = express.Router();
const userController    = require('../controllers/user.controller');
const { check } = require('express-validator');

// Create user -> api/users
router.post(
  '/',
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Type a valid email').isEmail(),
    check('password', 'Password should have at least 6 characters').isLength({ min: 6 })
  ],
  userController.createUser
  );

module.exports = router;