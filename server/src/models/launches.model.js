//Let's use Map() function to allow mapping keys and values
const launches = new Map();

// Let's say we need to store our launches into a javascript object

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  customer: ["GTech", "NASA"],
  upcoming: true,
  success: true,
};

// From Map function let's set the launches
launches.set(launch.flightNumber, launch); // here launch.flightNumber is passed as a key and the launch as value

/* TO ABSTRACT AWAY THE COMPUTATION THAT OTHER WORLD DOESN'T NEED TO CARE WE HAVE TO 
WRITE ANOTHER FUNCTION TO COMPUTE OUT DATA STRUCTURES.
*/

// This function is called DATA ACCESS FUNCTION. it doesn't receive any parameter because it is in models, no req, or res
// This function doesn't have to be complicated, and the benefit of this as we write more codes.

function getAllLaunches() {
  return Array.from(launches.values());
}

// Now let's access our launches
//launches.get(100); // instead of doing this, let's export this module so that we can use
// it in the rest our code.

module.exports = {
  getAllLaunches,
};

// Now I'm all set to build my launces router and expose our launches model to our
// front end using our express API.

// When we use Models with these data access functions, there is a clearer division of
// responsibilities between the model and the controller. the Model only works with
// the DATA based on however it is stored.
