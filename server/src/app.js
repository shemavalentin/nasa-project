const express = require("express");

const planetRouter = require("./routes/planets/planet.router");

const app = express();
// Here I will get the flexibility to pass express as a middleware when receiving the
// JSON requests.
app.use(express.json());

app.use(planetRouter);

module.exports = app;

/* 
How I have written the server and app.js(express) can be used to write any other scalable 
Node app. this is the best practice
*/
