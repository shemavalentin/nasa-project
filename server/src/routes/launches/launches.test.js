// THE FOLLOWING APPROACH IS USED TO TEST APIs, and any other kinds of tests

// 1. Here using this we can have a one test or a group of tests

// 2. The test is defined in the callback function

// let's require the supertest

const request = require("supertest");
const app = require("../../app");
//const { param } = require("./launches.router");

const { mongoConnect } = require("../../services/mongo");

// Now, where the mongoConnect function will be called?

// It should be called into both tests such as 'GET/launches and POST /launches'

// So it has to wrap up all tests. let's do it cleverly like this:

describe("Launches API", () => {
  // Adding a set Up step to our launches API tests, that needs to run before tests in describe run
  // like this:

  beforeAll(async () => {
    // What we need to set up is our mongo connection
    await mongoConnect();
  });

  describe("GET /launches", () => {
    // then here write the actual test codes
    test("It should respond with 200 success", async () => {
      // const response = request(app);

      //Now with the above, let's write a request aginst the response
      const response = await request(app)
        // using chaining whether to use Jest assertion
        .get("/launches")
        // Adding headers
        .expect("Content-Type", /json/)
        .expect(200);

      // writting assertion
      //   expect(response.statusCode).toBe(200);  // We can continous to write the jest assertion like this,
      // but supertest gives us convenient assertions
    });
  });

  // One test or group of tests
  describe("POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186 f",
      launchDate: "January 4, 2028",
    };

    // Declaring data without date

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186 f",
      //   launchDate: "January 4, 2028"
    };

    // Creating object with an invalid date

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186 f",
      launchDate: "booooo",
    };

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        // Keep on chaining to add headers
        .expect("Content-Type", /json/)
        .expect(201);

      // To make sure that the date part is working correctly, we need to set the request variable ...
      //   const requestDate = completeLaunchData.launchDate;//// need to add constructor to make sure they are in the same format
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      // matching the requestDate with the date that comes back from the response
      const responseDate = new Date(response.body.launchDate).valueOf();

      // Now to make sure that they are equal
      expect(requestDate).toBe(responseDate);

      // Whenever we check the body, we use the Jest assertion not the supertest assetion
      // And I'll add a method from Jest API Docs that is toMatchObject() to match the passed object
      // properties that needs to match
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    // Testing for errors
    test("It should catch missing required properties", async () => {
      // pasting our codes to make our launch's request
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        // Keep on chaining to add headers
        .expect("Content-Type", /json/)
        .expect(400);

      // Now we need to use expect from jest to check the body of the object
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      // Using the same above codes as base
      // pasting our codes to make our launch's request
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        // Keep on chaining to add headers
        .expect("Content-Type", /json/)
        .expect(400);

      // Now we need to use expect from jest to check the body of the object
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });

  // With the above, how do we write real API tests against our API and test the response?
  // For this, there is the best library to use: SuperTest library
  // SuperTest allows to make requests against our Node HTTP servers, and it also
  // provides convenient assertions on top of what jest provides for us.
  // These assertions are specific to HTTP request and responses.
});
