const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// Here initializing a promise function to await it resolve before we
// pass it to our planets.controller(API) to respond to clients.

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        // then here I call the reject function to reject when there is an error
        reject(error);
      })

      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);

        // Then we are done parsing our data and the habitablePlanets is populated,
        //we call resolve()
        resolve();
      });
  });
}

// Creating ACCESS function to abstracts calculationd that is passed to the controller
function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  //using the function after it was resolved or rejected here to be accessible
  loadPlanetsData,
  getAllPlanets,
};
