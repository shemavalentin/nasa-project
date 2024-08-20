// To start off, we need to import the express as we need it's built in routers
const express = require("express");

// We need to import the controller into the routes that hooks up our controller

const { httpGetAllLaunches } = require("./launches.controller");

// Defining launchesRouter, a variable to be an Express.router object

const launchesRouter = express.Router();

// Then basing on our launchesRouter set to express router which we can now need to define
// routs on

launchesRouter.get("/launches", httpGetAllLaunches);

// Now export launchesRouter so that we can use it in app.js
module.exports = launchesRouter;

/* 
Note: How do we bridge the Model that we've built with the router that we've just written?
We now have the router ready to go, and a model that's ready to go but till now 
the inside the controller is blank. The controller helps us to connect to router to model
as the router is the first that passes the request from client to the controller before 
before Model is updated. 
*/
