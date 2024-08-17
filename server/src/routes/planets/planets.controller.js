const planets = require("../../models/planets.model");
// function to get all planets
function getAllPlanets(req, res) {
  return res.status(200).json(planets); //  here the planets are is a javascript object
}

module.exports = {
  getAllPlanets,
};
