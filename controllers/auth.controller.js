// Imports
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User doesn't exist" });
  
    // Check password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ msg: "Invalid password" });

    // If everything's right...
    const payload = {
      user: {
        id: user.id
      }
    };
    
    jwt.sign(payload, "" + process.env.JWT_SECRET, {
      expiresIn: 3600
    }, (error, token) => {
        if (error) throw error;
        // Send confirmation msg
        res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong when authenticating user' });
  };
};