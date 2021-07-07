const express = require('express');
const projectsRouter = require('./data/projects-router.js');
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the web API</h1>');
});

module.exports = server;
