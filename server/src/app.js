const path = require("path");

const express = require("express");

const cors = require("cors");

const morgan = require("morgan");
/* MOVED TO api.js FOR VERSIONING ISSUE
// const planetRouter = require("./routes/planets/planet.router");

// const launchesRouter = require("./routes/launches/launches.router");

*/

// importing the api router

const api = require("./routes/api");

const app = express();

// set CORS to whitelist request from different origins
// But we need to not allow everything enter our API, we must add set of security.
app.use(
  cors({
    // Allowing request from specific origin
    origin: "http://localhost:3000",
  })
);

// Adding a Morgan Middleware to manage logs from requests as they can fill up the server's disk
app.use(morgan("combined"));

// Here I will get the flexibility to pass express as a middleware when receiving the
// JSON requests.
app.use(express.json());
// serving the optimized front end build folder to production after setting the path in
// client package.json.
app.use(express.static(path.join(__dirname, "..", "public"))); // the path.join helps to find the file we want through the path
// and join two files using that path

/* MOVED TO api.js FOR VERSIONING
// app.use("/v1/planets", planetRouter);
// app.use("/v1/launches", launchesRouter);

*/

//====Adding the api as middleware to our servers middleware chain here by calling:
app.use("/v1", api); // now the route with v ersion is mounted.

// If we had the version2 of our API, we could also mount it here like this
// app.use("/v2", apiVersion2). this allows us to support multiple versions of our APIs.
// but for now we only have version1 only.

// Serving the index.html to the root so that the user doesn't need to specify that he needs to load index.html
// and so that that first page load corresponds to the launch page.
// Telling express what to do when it sees '/'
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

/* 
How I have written the server and app.js(express) can be used to write any other scalable 
Node app. this is the best practice
*/
