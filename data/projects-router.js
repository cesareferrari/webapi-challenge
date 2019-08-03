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

module.exports = router;
