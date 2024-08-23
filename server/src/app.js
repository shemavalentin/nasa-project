const path = require("path");

const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const planetRouter = require("./routes/planets/planet.router");

const launchesRouter = require("./routes/launches/launches.router");

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

app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

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
