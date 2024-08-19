const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  // Consuming getAllPlanets under local host and our set PORT: 8000  as the backend is running on 8000
  // and my route is pointing to planets collection

  const response = await fetch(`${API_URL}/planets`);
  // Load planets and return as JSON.
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();

  // When it comes to validation, we need to validate both back end and front end
  // to be extra sure.

  // Sorting the fetchedLaunches in ascending order by flightNumber
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber; // if a flightNumber at a.flightNumber is less than b.flightNumber, then it will be negative and sort it.
  });
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
