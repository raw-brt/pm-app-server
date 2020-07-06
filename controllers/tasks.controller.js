const Task = require('../models/task.model');
const Project = require('../models/project.model');
const { validationResult } = require('express-validator');

module.exports.createTask = async (req, res) => {
  // Look for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {

    // Check if passed project exists
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) return res.status(404).json({ msg: 'Project not found' });

    // Check project's owner
    if (existingProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission denied' });
    };

    // Create new task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });

  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong when trying to create a task');
  }
};


module.exports.getTasks = async (req, res) => {
  // Look for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // Check if passed project exists
  const existingProject = await Project.findById(req.params.id);
  if (!existingProject) return res.status(404).json({ msg: "Project not found" });

  // Check project owner
  if (existingProject.owner.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'Permission denied' });
  }

  // Get tasks for a given project
  const tasks = await Task.find({ project: req.params.id });
  res.json(tasks);

  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong when trying to get tasks' });
  }
};


module.exports.updateTask = async (req, res) => {};


module.exports.deleteTask = async (req, res) => {};