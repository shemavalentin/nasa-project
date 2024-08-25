// This function is going to use launces model

//const launchesModel = require("../../models/launches.model");

// Now because we will use the exported launches from launches.model, let's destructure it.

// const { launches } = require("../../models/launches.model");

//const launchesModel = require("../../models/launches.model");

// Let's use HTTP to be more explicity
const {
  getAllLaunches,
  addNewLaunche,
} = require("../../models/launches.model");

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

// Function controlller to handle added new launches
function httpAddNewLaunch(req, res) {
  const launch = req.body; // the express server middleware will parse it in the body in app.js

  // It's always important to validate our API for different errors
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(404).json({
      // We need to be consistent to the format. we could also have to return with a string
      // but let's be consistent

      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  // validating dates to check if it is in a valid format not a string
  if (launch.launchDate.toString() === "Invalid Date") {
    // if (isNaN(launch.launchDate)) {
    // We can also check if dates is invalid like this: Note: NaN => Not a Number
    // which calls automatically: valueOf() to verify it's falsy or truthy
    // const date = new Date("1 january, 2030")
    // if(isNaN(launch.launchDate)){ } the object passed in isNaN() will be first checked if it is a number
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunche(launch);

  // what to return now? Remember, when we POST to a collection and the request succeeds
  // we want to show the status

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
