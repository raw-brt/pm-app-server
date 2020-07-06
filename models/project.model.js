const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    tasks: {
      type: Array
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  }, { timestamps: true });

  const Project = mongoose.model('Project', projectSchema);

  module.exports = Project;