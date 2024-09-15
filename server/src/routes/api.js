// In this file we can version our API by writting each version(like v1) number
// before each and every route in our API. This approach works, BUT let's say we
// want to organize things a little bite better so that we don't have to prefix
// all our routes with the version number individually.

// We could put all of our versions 1 routes under an indivisual express router, and
// create a new router for each version of the API.

// Let's do that. Note that this file can be named version1.js or whatever to know that
// it is for versioning. but here because it the only one version, let's call it api.js

// Importing express to as we don't have app object here
const express = require("express");

const planetRouter = require("./planets/planet.router");

const launchesRouter = require("./launches/launches.router");

// using express let's create a router that capture v1 of our API

const api = express.Router();

// Then replace app with the api constant

// app.use("/v1/planets", planetRouter);
api.use("/planets", planetRouter); // Removed the version and practiced in app.js

// app.use("/v1/launches", launchesRouter);
api.use("/launches", launchesRouter); // Removed the version and practiced in app.js

// Then export api to be accessible
module.exports = api;
