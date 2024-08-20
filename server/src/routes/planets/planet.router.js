const express = require("express");

// Importing ACCESS function form planets.controller
const { httpGetAllPlanets } = require("./planets.controller");

// Routes to get all planets and taking into advantage of the Express built in router to sumplify things
const planetRouter = express.Router();

// Getting all planets under th / collection
planetRouter.get("/planets", httpGetAllPlanets);

module.exports = planetRouter;
