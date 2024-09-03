const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

// Now after building planets.mongo.js that is where we need to save and persist our data,
// let's connect our controller (API) with our mongodb to talk to collections but step by step
// to avoid breaking our server

const planets = require("./planets.mongo");

// After replacing to save to Mongodb let's get rid of the following array

// const habitablePlanets = [];

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
          // habitablePlanets.push(data);
          // Here whether to push the data to the habitablePlanets array, after requiring
          // let's push data to our mongodb. collection--> document

          //TODO: REPLACE BELLOW CREATE WITH INSERT + UPDATE = UPSERT

          // await planets.create({   // Now whether to use create(), let's use upsert

          // Called the function created to abstract the save to Mongodb
          savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        // then here I call the reject function to reject when there is an error
        reject(error);
      })

      .on("end", async () => {
        // To get the amount of planets in our habitable planets in mongo:
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);

        // Then we are done parsing our data and the habitablePlanets is populated,
        //we call resolve()
        resolve();
      });
  });
}

// Creating ACCESS function to abstracts calculationd that is passed to the controller
async function getAllPlanets() {
  // return habitablePlanets;

  //LET'S USE MONGOOSE TO RETURN PLANETS.
  return await planets.find(
    {
      // here we pass in a JS object and when we let the object empty,all planets will be returned
      // then we need to be specifique to only return properties matching
      //keplerName: "Kepler-62 f", //=> Cze we need all planets, there is no need to pass anky specific properties.
      // the find func accept the 2nd argument that is an object also called projection in Mongo.
      // This argument object it's the list of fields from those planet documents that you'd like
      // to include in the result.
    }
    //{}
  );
}

async function savePlanet(planet) {
  // let's use try and catch for errors

  try {
    await planets.updateOne(
      {
        // create function here, creates a new document and pass the same data defined from the schema.

        keplerName: planet.kepler_name, // kepler_name that matches the csv file column

        // Now to avoid that this document will be created many times when we created many instances/clusters of server.js as the loadPlanetsData() is called many times
        // Mongoose simply solved this problem using upsert func(insert + update): Insert + Update = upsert
      },

      // This second object will help to if the property in the first object already exist,
      // then we'll just update that document with whatever's in this second object.

      {
        keplerName: planet.kepler_name, // Untill now by default the updateOne() function will only update.
        // if the planet doesn't already exist it won't do anything.

        // That's where UPSERT comes in.
      },
      {
        // The upsert function is defined as the third Object here:
        upsert: true, // now the planet will be added if it  does not already exist
        // if exists, the update in the second passed object won't change anything.
      }
    );
  } catch (err) {
    console.log(`Could not save planet ${err}`);
  }
}

module.exports = {
  //using the function after it was resolved or rejected here to be accessible
  loadPlanetsData,
  getAllPlanets,
};
