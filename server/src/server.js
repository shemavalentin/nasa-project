const http = require("http");

// const express = require("express");

// const app = express();

const app = require("./app");

// setting the port: find on server in environment variables, if not found run on 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// Moved express codes to app.js for more code organization
// The added benefit of this is that now we can organize our code a little bit more,
// by separating the server functionality that we have here from our express code,

// It is important to start a server in this way, using the built in HTTP server, allows us
//to not only respond to HTTP requests, but also other types of communications
// for example, to use WebSockets for real time communication as opposed to sending reqs
// and waiting for the response.

// Note that Express is truly a middleware that we add on top of the built-in Node HTTP server,
