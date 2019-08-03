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
    res.status(500).json({message: "Unable to perform the operation requested."})
  }
});

module.exports = router;
