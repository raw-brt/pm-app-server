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

  try {
    // Look for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Check if passed project exists
    const existingProject = await Project.findById(req.params.projectId);
    if (!existingProject) return res.status(404).json({ msg: "Project not found" });

    // Check project owner
    if (existingProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission denied' });
    };

    // Get tasks for a given project
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong when trying to get tasks' });
  }
};


module.exports.updateTask = async (req, res) => {

  try {
    // Look for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Check if task exists
    const existingTask = await Task.findById(req.params.taskId);
    if (!existingTask) return res.status(404).json({ msg: 'Task not found' });

    // Check project owner
    if (existingProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission denied' });
    };

    // Create object with updated data
    const newTask = {};

    if (req.body.name) newTask.name = req.body.name;
    if (req.body.status) newTask.status = req.body.status;

    // Update task
    updatedTask = await Task.findOneAndUpdate({ _id: req.params.taskId }, newTask, { new: true });

    res.json(updatedTask);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong when trying to update a task' });
  }
};


module.exports.deleteTask = async (req, res) => {
  try {
    // Look for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Check if task exists
    const existingTask = await Task.findById(req.params.taskId);
    if (!existingTask) return res.status(404).json({ msg: 'Task not found' });

    // Check project owner
    if (existingProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission denied' });
    };

    // Delete task
    await Task.findOneAndRemove({ _id: req.params.taskId });
    res.json({ msg: 'Task deleted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong when trying to delete a task' });
  }
};