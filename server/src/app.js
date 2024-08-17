const express = require("rexpress");
const app = express();
// Here I will get the flexibility to pass express as a middleware when receiving the
// JSON requests.
app.use(express.json());

module.exports = app;

/* 
How I have written the server and app.js(express) can be used to write any other scalable 
Node app. this is the best practice
*/
