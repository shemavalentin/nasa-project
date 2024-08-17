const express = require("express");

const cors = require("cors");

const planetRouter = require("./routes/planets/planet.router");

const app = express();

// set CORS to whitelist request from different origins
// But we need to not allow everything enter our API, we must add set of security.
app.use(
  cors({
    // Allowing request from specific origin
    origin: "http://localhost:3000",
  })
);

// Here I will get the flexibility to pass express as a middleware when receiving the
// JSON requests.
app.use(express.json());

app.use(planetRouter);

module.exports = app;

/* 
How I have written the server and app.js(express) can be used to write any other scalable 
Node app. this is the best practice
*/
