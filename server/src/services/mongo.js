// There is different convention you might see for this shared codes that doesn't fall
// under the category of being a model or a route.

// You might see some people calling a utility folder, or utils for short.

// But I like to make it explicit, rather than just being general utility functions
// for that let's call it services that are going to be available throughout the
// lifecycle our server

// And the mongo.js file will have all of the code where we use mongoose.

const mongoose = require("mongoose");

// Ensuring that our tests know the URL of our Mongo database
require("dotenv").config();

// Here will use whatever has been set from .env file but under the process.env. then put property
const MONGO_URL = process.env.MONGO_URL; // Now for these values to be populated, we need to actually
// apply apply the changes using our .env package. we can do this in server.js file

// The following are Event listeners

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

// Mongoose function to create the connetion

async function mongoConnect() {
  // then copy codes from server.js

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
}

// Making a function to disconnect from Mongo
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
