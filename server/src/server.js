const http = require("http");

const mongoose = require("mongoose");

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

// Over here, let's create the database connection. here used MongoBb.
// We use the string connection from MongoDb account

const MONGO_URL =
  "mongodb+srv://shemavalentin:W3reAmalaC8qffAB@cluster0.c4wsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//mongodb+srv://shemavalentin:W3reAmalaC8qffAB@cluster0.c4wsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const server = http.createServer(app);

// Let's test the connection here: note that the mongoose.connection is an event emmiter
// that needs subscription

mongoose.connection.once("open", () => {
  // this function that has the open event will only be triggered once, the first time the connection is ready.
  console.log("MongoDB connection ready!");
});

// NOW WHAT IF THERE IS ERRORS?
// As we don't know how many and when the error will get triggered. it could definitely be more than once.
// use the ON() to this event emiter

mongoose.connection.on("error", (err) => {
  // console.log() we can use
  console.error(err);
});

async function startServer() {
  // Right here, we need to connect to mongo before our server start listening
  // so that all of our data is available when we start handling requests from
  //from the user. and we have to await them. then optionally pass another.

  // Awaiting loadPlanetsData function so that my planets data is available
  // for any request that ever comes in to my server and the server should start
  // listening when data is available.

  await mongoose.connect(MONGO_URL, {
    // IMPORTANT: Every time you connect using mongoose, you'll pass in four parmeters
    // into the connect function. If we don't specify these options, we will get some
    // deprecation warnings in our console warning us that the best way of doing things
    // is by passing in use new URL PARSER AND SETTING THAT TO TRUE..
    // Now let's do it:
    //useNewUrlParser: true, // This determines how Mongoose parses that connection string we just copied into our mongo URL
    //useFindAndModify: false, // It desables the outdated way of updating Mongo data using using this function
    //useCreateIndex: true, // Here Mongoose will use the CreateIndex function rather than the older and ensure index function
    //useUnifiedTopology: true, // using this function, Mongoose will use the updated way of talking to clusters of Mongo database using this unified topology approach.
    // All of the above functions are options in the MongoDB driver that Mongoose uses to connect to our database.
  });

  // NOW, HOW DO WE TEST THAT OUR CONNECTION IS WORKING? the mongodb exposes these functions. ....> UP

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
