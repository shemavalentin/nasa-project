// Importing the ACCESS function from Model

const { getAllPlanets } = require("../../models/planets.model");
// function to get all planets and using the http to avoid naming comflicts. the function started with
// http means it will return a response
function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets()); //  here the getAllPlanets are is a javascript object
}

module.exports = {
  httpGetAllPlanets,
};
