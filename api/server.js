const express = require('express');
const server = express();
const { serverLogger } = require("./server_middleware")
//Router Imports

//Server Use Statements
server.use(express.json());
server.use(serverLogger);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', (request, response) => {
     response.send("This server is listening");
})

module.exports = server;
