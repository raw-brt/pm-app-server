// Imports
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body;
  console.log(password)

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user object
    user = new User(req.body);
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user in DB
    await user.save();

    // Create and sign JWT
    const payload = {
      user: {
        id: user.id,
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
    res.status(400).send('Something went wrong when trying to create a new user');
  }
};