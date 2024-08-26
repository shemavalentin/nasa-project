// THE FOLLOWING APPROACH IS USED TO TEST APIs

// 1. Here using this we can have a one test or a group of tests

// 2. The test is defined in the callback function

describe("GET /launches", () => {
  // then here write the actual test codes
  test("It should respond with 200 success", () => {
    const response = 200;

    // writting assertion
    expect(response).toBe(200);
  });
});

// One test or group of tests
describe("POST /launches", () => {
  test("It should respond with 200 success", () => {});

  test("It should catch missing required properties", () => {});

  test("It should catch invalid dates", () => {});
});
