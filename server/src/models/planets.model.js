const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

// Now after building planets.mongo.js that is where we need to save and persist our data,
// let's connect our controller (API) with our mongodb to talk to collections but step by step
// to avoid breaking our server

const planets = require("./planets.mongo");

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
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          // Here whether to push the data to the habitablePlanets array, after requiring
          // let's push data to our mongodb. collection--> document
          /* TODO: REPLACE BELLOW CREATE WITH INSERT + UPDATE = UPSERT
          await planets.create({
            // create function here, creates a new document and pass the same data defined from the schema.
            keplerName: data.keple_name,

            // Now to avoid that this document will be created many times when we created many instances/clusters of server.js as the loadPlanetsData() is called many times
            // Mongoose simply solved this problem using upsert func(insert + update): Insert + Update = upsert
          }); */
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
