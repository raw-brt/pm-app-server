// Auth routes
const express           = require('express');
const router            = express.Router();
const authController    = require('../controllers/auth.controller');
const authMiddleware    = require('../middlewares/auth.middleware');
const { check }         = require('express-validator');

// Login -> api/auth
router.post(
  '/',
  [
    check('email', 'Type a valid email').isEmail(),
    check('password', 'Password should have at least 6 characters').isLength({ min: 6 })
  ],
  authController.authUser
  );

  router.get(
    '/',
    authMiddleware.isAuthenticated,
    authController.getAuthUser
  );

module.exports = router;