var app = require("./App.js");
var request = require("supertest");

test("add 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

describe("GET REQUEST TO SERVER TESTING EXPRESS ROUTES", () => {
  it("responds with text/html and status code 200", (done) => {
    console.log(done);
    request(app)
      .get("/test")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Content-Length", "9")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBe("test pass");
        done();
      });
  });
});
