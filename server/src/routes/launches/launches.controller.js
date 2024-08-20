// This function is going to use launces model

//const launchesModel = require("../../models/launches.model");

// Now because we will use the exported launches from launches.model, let's destructure it.

// const { launches } = require("../../models/launches.model");

//const launchesModel = require("../../models/launches.model");

// Let's use HTTP to be more explicity
const { getAllLaunches } = require("../../models/launches.model");

// Now with that the Controller that briges Routes and Model was blank
// let's connect both of them

function httpGetAllLaunches(req, res) {
  //return res.status(200).json(); // Unfortunately the map objects that we have in
  // our model aren't javascript object notation. we need to convert the object to
  // the plane js array or object like this from map, so that we can return the
  // proper json on the front end.

  // return res.status(200).json(Array.from(launches.values()));

  // The controller does not need to care so much about Model, conversions of data,
  // as here it is waitin the returned key-value pairs then convert the to Arrays.
  // We need to abstract away all these.

  //return res.status(200).json(launchesModel.getAllLaunches());

  // By being more explicity and benefit from the best of destructuring we can call any
  // function that works woth our HTTP request and response , an HTTP function by saying
  // HTTPgetAllLaunches.

  return res.status(200).json(getAllLaunches());

  // Note: As we know, every function starting with http returns a response
}

module.exports = {
  httpGetAllLaunches,
};
