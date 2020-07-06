const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;