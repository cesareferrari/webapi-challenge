const express = require('express');
const router = express.Router();
const Projects = require('./helpers/projectModel.js');

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({message: "Couldn't retrieve the projects.", error})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const project = await Projects.get(id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({message: "Project not found."});
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to perform the operation requested.", error });
  }
});

router.post('/', async (req, res) => {
  try {
    const project = req.body;

    if (project.name && project.description) {
      const newProject = await Projects.insert(req.body);
      res.status(201).json(newProject);
    } else {
      res.status(400).json({ message: "Error: Project name and description are required." });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to perform the operation requested.", error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const project = req.body;

    if (project.name && project.description) {
      const updatedProject = await Projects.update(id, project);
      res.status(200).json(updatedProject);
    } else {
      res.status(400).json({ message: "Error: Project name and description are required." });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to perform the operation requested.", error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const project = await Projects.get(id);

    if (project) {
      const numberOfProjectsRemoved = await Projects.remove(id);
      res.status(200).json({message: `Removed ${numberOfProjectsRemoved} projects`});
    } else {
      res.status(400).json({ message: `Error: Project with ID ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to perform the operation requested.", error });
  }
});


module.exports = router;
