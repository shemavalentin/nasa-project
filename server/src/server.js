const http = require("http");

// const express = require("express");

// const app = express();

const app = require("./app");

// importing planets.model module thtat has a function loadPlannetsData
// that we need to wait to complete before listening for and respond to
// requests.

// const planetsModel = require('./routes/planets/planets.controller')

// alternatively use destructuring to know that we using the imported function
const { loadPlanetsData } = require("./models/planets.model");

// setting the port: find on server in environment variables, if not found run on 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  // Awaiting loadPlanetsData function so that my planets data is available
  // for any request that ever comes in to my server

  await loadPlanetsData(); // notice no return value is need as it is on server

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

// callig startServer() that will await the function to resolve and after
// start listening

startServer();

// Moved express codes to app.js for more code organization
// The added benefit of this is that now we can organize our code a little bit more,
// by separating the server functionality that we have here from our express code,

// It is important to start a server in this way, using the built in HTTP server, allows us
//to not only respond to HTTP requests, but also other types of communications
// for example, to use WebSockets for real time communication as opposed to sending reqs
// and waiting for the response.

// Note that Express is truly a middleware that we add on top of the built-in Node HTTP server,
