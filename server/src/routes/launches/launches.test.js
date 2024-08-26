// THE FOLLOWING APPROACH IS USED TO TEST APIs, and any other kinds of tests

// 1. Here using this we can have a one test or a group of tests

// 2. The test is defined in the callback function

// let's require the supertest

const request = require("supertest");
const app = require("../../app");

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
  test("It should respond with 200 success", () => {});

  test("It should catch missing required properties", () => {});

  test("It should catch invalid dates", () => {});
});

// With the above, how do we write real API tests against our API and test the response?
// For this, there is the best library to use: SuperTest library
// SuperTest allows to make requests against our Node HTTP servers, and it also
// provides convenient assertions on top of what jest provides for us.
// These assertions are specific to HTTP request and responses.
