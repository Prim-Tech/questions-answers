var app = require("./App.js");
var request = require("supertest");

test("add 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

describe("Test the endpoint response", () => {
  test("It should respond with a 200 status code", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Testing the /qa/questions endpoint with product_id = 3 to see if it returns an object", () => {
  test("It should respond with a 200 status code", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        console.log(JSON.parse(response.text));
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
      });
  });
});

// describe("Testing the /qa/questions endpoint with product_id = 3 to see if it returns an object", () => {
//   test("It should respond with a 200 status code", () => {
//     return request(app)
//       .get("/qa/questions?product_id=3") // Replace with your endpoint URL
//       .then((response) => {
//         expect(JSON.parse(response.text)[0].results[0].answers).toBeInstanceOf(
//           Array,
//         );
//       });
//   });
// });
