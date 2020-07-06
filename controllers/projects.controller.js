const Project = require('../models/project.model');
const {validationResult} = require('express-validator');
const { update } = require('../models/project.model');

module.exports.createProject = async (req, res) => {

  // Look for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Create new project
    const project = new Project(req.body);

    // Save owner using JWT
    project.owner = req.user.id;

    // Save project
    project.save();
    res.json(project);

  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong when trying to create a project');
  };
};

module.exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong when trying to read projects');
  };
};

module.exports.updateProject = async (req, res) => {
    // Look for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;
    const updatedProject = {};
    if (name) updatedProject.name = name;

    try {

      // Check ID
      let existingProject = await Project.findById(req.params.id);

      // Check project existence
      if (!existingProject) return res.status(404).json({ msg: 'Project not found' });

      // Check project owner
      if (existingProject.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Permission denied' });
      }

      // Update project
      project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedProject }, { new: true });

      res.json({ project });

    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong when trying to update project');
    }
};