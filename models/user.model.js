const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;