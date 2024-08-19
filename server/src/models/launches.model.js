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

// Now let's access our launches
//launches.get(100); // instead of doing this, let's export this module so that we can use
// it in the rest our code.

module.exports = {
  launches,
};

// Now I'm all set to build my launces router and expose our launches model to our
// front end using our express API.
