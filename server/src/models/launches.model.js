// Importing Mongoose Model
const launchesDatabase = require("./launches.mongo");

// Import planets.mongo.js to help in validation of planets to check that the planets the
// user is referencing exist

const planets = require("./planets.mongo");

// let's define the constant here above to assing whene the database is empty
const DEFAUL_FLIGHT_NUMBER = 100;

//Let's use Map() function to allow mapping keys and values
const launches = new Map();

// To create the new launche we need to track the flightNumber and not the client to send it to us
// let latestFlightNumber = 100; // as it is in launch object

// Let's say we need to store our launches into a javascript object
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  // target: "Valentin's home planet", // the target could habe been referenced as a foreign key if I was using the SQL db and referenced throug the id as planets are store in a separete table.
  // and luckly, the mongoose follow the same approach.

  target: "Kepler-442 b",
  customers: ["GTech", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

// From Map function let's set the launches
// launches.set(launch.flightNumber, launch); // here launch.flightNumber is passed as a key and the launch as value

// The function to check the existence of the id in model
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

/* TO ABSTRACT AWAY THE COMPUTATION THAT OTHER WORLD DOESN'T NEED TO CARE WE HAVE TO 
WRITE ANOTHER FUNCTION TO COMPUTE OUT DATA STRUCTURES.
*/

// A function to keep track of new launch and solving the auto Increament  problem in MongoDB
// Let's make it async because we are querrying from MongoDB
async function getLatestFlightNumber() {
  // After commenting the flightNumber, let's look at the latest launch
  const latestLaunch = await launchesDatabase
    .findOne() // We need only one, let's use findOne() with no filter => (find({filter obj}))
    // Be clever and sort launches
    // .sort('flighNumber')  // by default this sorts ascending order
    // but we need to sort from the highest to the lowest, we need the highest to appear above and we do it like this by adding minus sign
    .sort("-flightNumber");

  // if there is no launches in our database, we need to validate it and save that very first launch
  // If there is no latest launch, it means in the database there is no data
  if (!latestLaunch) {
    return DEFAUL_FLIGHT_NUMBER;
  }

  // then return from our function the launch flight Number

  return latestLaunch.flightNumber;
}

// This function is called DATA ACCESS FUNCTION. it doesn't receive any parameter because it is in models, no req, or res
// This function doesn't have to be complicated, and the benefit of this as we write more codes.

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatabase.find(
    {},
    // using the projection argument to make sure that we are not showing the MongoDB IDs or Mongoose version key in our response
    {
      _id: 0,
      __v: 0,
    }
  );
}

// Function to save data to our mongodb

async function saveLaunch(launch) {
  // let's now check if the planet exists/find or use findOne to return only one not all
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  // If does not exist
  if (!planet) {
    // thing to remember, here we are not in the controller where we are allowed to return
    // error message. we are at the lower layer. so how to signal error? we can retun an invalid object, or
    // preferably throw an error using built in Error object

    throw new Error("No matching planet was found");
  }
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber, //  if the flight number matches the new launch flightNumber,
    },
    // if the above document already exist, then we update it here, and if it does not exist
    // we will insert

    launch, // we insert the lauch object

    // Then remember to pass in the third object
    { upsert: true }
  );
}

//Writting a function that our router can use to set our launches in the launches Map()
// the function will accept launche which will be added to the collection

// ==== ADDINNG A VERSION OF THE addNewLaunch FUNCTION THAT WORKS WITH OUR DATABASE.
async function scheduleNewLaunch(launch) {
  // Notice how this function is not exported. It's an implementation detail, but not the core functionality for our launch.
  // Here let's call getLatestFlightNumber function to get new launch and increment it
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    // here I'm copying some properties needed to be added int lauch
    success: true,
    upcoming: true,
    customers: ["Clever Technologies", "NAZA"],
    flightNumber: newFlightNumber,
  });

  // Now let's save our new launch by calling the function to perform save
  await saveLaunch(newLaunch);
}

/*
function addNewLaunche(launch) {
  // Now use the latestFlightNumber to increament it on server side
  latestFlightNumber += 1;
  //return launches.set(latestFlightNumber, launche);

  //return launches.set(latestFlightNumber, launch); // Notice that here latestFlightNumber is the key and launch is the value
  // Now we need to add that latestFlightNumber into our launch by assigning it to launch like this

  return launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      /// launch: where to put, and the source
      success: true,
      upcoming: true,
      customers: ["Clever Technologies", "NAZA"],
      flightNumber: latestFlightNumber,
    })
  );
}

*/

// Creating a function to abort a lauch by Id
function abortLaunchById(launchId) {
  // this will completely delete the launch.
  //launches.delete(launchId);
  // whether to completely delete it, let's mark it as aborted instead of removing it
  // after all that data is still usefull to us.

  // Now
  const aborted = launches.get(launchId);
  // then on that object, we set aborted to upcomming and now upcomming missions are no
  // longer upcomming. they are entirely cancelled.

  aborted.upcoming = false;

  // then mutate the aborted object property to false,
  aborted.success = false;
  // here the mission is going to be in historical list, and will be marked as not successful.
  // that's what we needed.
  return aborted;
}

// Now let's access our launches
//launches.get(100); // instead of doing this, let's export this module so that we can use
// it in the rest our code.

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  // addNewLaunche,
  scheduleNewLaunch,
  abortLaunchById,
};

// Now I'm all set to build my launces router and expose our launches model to our
// front end using our express API.

// When we use Models with these data access functions, there is a clearer division of
// responsibilities between the model and the controller. the Model only works with
// the DATA based on however it is stored.
