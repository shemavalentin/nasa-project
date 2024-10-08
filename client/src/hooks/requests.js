// const API_URL = "http://localhost:8000/v1";

// Updated to this to run the above url in the cloud regardless where we are running our server
// Now the client will know where to make requests that it is to the API that's living
// on the same address at the same origin as the front end.

// And we have to remember that we are serving both the front end client as well as the
// server using the same node application. the API and our front end are both hosted on
// the same server regarless of whether it's localhost or some other domain.

const API_URL = "v1";

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

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready. Connecting API and front End
  // remember that fetch method default to the GET method. now we need to add in the method
  // as a parameter to it
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      // Now add the launch as the body that is received by this function
      //body: launch, // fetch function in the browser receives a string while the lauch here is an object.

      // We need to convert it into a string. then if we pass in the json, we have to add the header
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
