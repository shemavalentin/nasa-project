// This function is going to use launces model

//const launchesModel = require("../../models/launches.model");

// Now because we will use the exported launches from launches.model, let's destructure it.

const { launches } = require("../../models/launches.model");

// Now with that the Controller that briges Routes and Model was blank
// let's connect both of them

function getAllLaunches(req, res) {
  //return res.status(200).json(); // Unfortunately the map objects that we have in
  // our model aren't javascript object notation. we need to convert the object to
  // the plane js array or object like this from map, so that we can return the
  // proper json on the front end.

  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
