const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the web API</h1>');
});

module.exports = server;
