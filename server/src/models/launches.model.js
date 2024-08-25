//Let's use Map() function to allow mapping keys and values
const launches = new Map();

// To create the new launche we need to track the flightNumber and not the client to send it to us
let latestFlightNumber = 100; // as it is in launch object

// Let's say we need to store our launches into a javascript object
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["GTech", "NASA"],
  upcoming: true,
  success: true,
};

// From Map function let's set the launches
launches.set(launch.flightNumber, launch); // here launch.flightNumber is passed as a key and the launch as value

// The function to check the existence of the id in model
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

/* TO ABSTRACT AWAY THE COMPUTATION THAT OTHER WORLD DOESN'T NEED TO CARE WE HAVE TO 
WRITE ANOTHER FUNCTION TO COMPUTE OUT DATA STRUCTURES.
*/

// This function is called DATA ACCESS FUNCTION. it doesn't receive any parameter because it is in models, no req, or res
// This function doesn't have to be complicated, and the benefit of this as we write more codes.

function getAllLaunches() {
  return Array.from(launches.values());
}

//Writting a function that our router can use to set our launches in the launches Map()
// the function will accept launche which will be added to the collection
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
  getAllLaunches,
  addNewLaunche,
  existsLaunchWithId,
  abortLaunchById,
};

// Now I'm all set to build my launces router and expose our launches model to our
// front end using our express API.

// When we use Models with these data access functions, there is a clearer division of
// responsibilities between the model and the controller. the Model only works with
// the DATA based on however it is stored.
