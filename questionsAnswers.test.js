var app = require("./App.js");
var request = require("supertest");
var axios = require("axios");

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

describe("Test the endpoint response", () => {
  test("It should respond with a 200 status code", () => {
    return request(app)
      .get("/qa/questions?product_id=32178930123312312") // Replace with your endpoint URL
      .then((response) => {
        console.log("---> rick", response);
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Testing the data types that is in the response when -> GET request -> /qa/questions?product_id=3", () => {
  test("It should respond with a 200 status code", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
      });
  });

  test("results key in the response should be an array", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        expect(Array.isArray(result.results) === true).toBe(true);
      });
  });

  test("question_id key in the response should be a number", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.question_id).toBe("number");
      });
  });

  test("question_body key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.question_body).toBe("string");
      });
  });

  test("question_date key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.question_date).toBe("string");
      });
  });

  test("asker_name key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.asker_name).toBe("string");
      });
  });

  test("question_helpfulness key in the response should be a number", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.question_helpfulness).toBe("number");
      });
  });

  test("reported key in the response should be a boolean", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.reported).toBe("boolean");
      });
  });

  test("answers key in the response should be a object", () => {
    return request(app)
      .get("/qa/questions?product_id=3") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(firstItem.answers).toBeInstanceOf(Object);
      });
  });
});

describe("Testing the data types that is in the response when -> GET request -> /qa/questions/1/answers", () => {
  test("results key in the response should be a array", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results;
        expect(firstItem).toBeInstanceOf(Array);
      });
  });

  test("answer_id key in the response should be a number", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.answer_id).toBe("number");
      });
  });

  test("body key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.body).toBe("string");
      });
  });

  test("date key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.date).toBe("string");
      });
  });

  test("answerer_name key in the response should be a string", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.answerer_name).toBe("string");
      });
  });

  test("helpfulness key in the response should be a number", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(typeof firstItem.helpfulness).toBe("number");
      });
  });

  test("photos key in the response should be a array", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0];
        expect(firstItem.photos).toBeInstanceOf(Array);
      });
  });

  test("checking photos column value", () => {
    return request(app)
      .get("/qa/questions/1/answers") // Replace with your endpoint URL
      .then((response) => {
        var result = JSON.parse(response.text);
        var firstItem = result.results[0].photos[0];
        expect(typeof firstItem.id).toBe("number");
        expect(typeof firstItem.url).toBe("string");
      });
  });
});

describe("Testing the data types that is in the response when -> POST request -> /qa/questions", () => {
  test("Testing post request and the data that is returned", async () => {
    const response = await axios.post("http://localhost:9000/qa/questions", {
      body: "does this jest testing work?",
      name: "stanman",
      email: "stanley@gmail.com",
      product_id: 1,
    });

    // Assert that the response has the expected data
    expect(response.data.command).toBe("INSERT");
    expect(JSON.parse(response.config.data)).toBeInstanceOf(Object);

    var data = JSON.parse(response.config.data);

    expect(data.body).toBe("does this jest testing work?");
    expect(data.name).toBe("stanman");
    expect(data.email).toBe("stanley@gmail.com");
    expect(data.product_id).toBe(1);
  });
});

describe("Testing the data types that is in the response when -> POST request -> /qa/questions/1/answers", () => {
  test("Testing post request and the data that is returned", async () => {
    const response = await axios.post(
      "http://localhost:9000/qa/questions/1/answers",
      {
        body: "does this jest testing work?",
        name: "stanman",
        email: "stanley@gmail.com",
        photos: ["test1", "test2", "test3"],
      },
    );

    // Assert that the response has the expected data
    expect(response.data.command).toBe("INSERT");
    expect(JSON.parse(response.config.data)).toBeInstanceOf(Object);

    var data = JSON.parse(response.config.data);

    expect(data.body).toBe("does this jest testing work?");
    expect(data.name).toBe("stanman");
    expect(data.email).toBe("stanley@gmail.com");
    expect(data.photos).toBeInstanceOf(Array);
    expect(data.photos[0]).toBe("test1");
    expect(data.photos[1]).toBe("test2");
    expect(data.photos[2]).toBe("test3");
  });
});

describe("Testing the data types that is in the response when -> PUT request -> /qa/questions/1/helpful", () => {
  test("Testing PUT request for endpoint helpful for a specific question", async () => {
    const response = await axios.put(
      "http://localhost:9000/qa/questions/1/helpful",
    );

    expect(response.status).toBe(204);
    expect(response.config.method).toBe("put");
  });
});

describe("Testing the data types that is in the response when -> PUT request -> /qa/questions/1/report", () => {
  test("Testing PUT request for endpoint reported for a specific question", async () => {
    const response = await axios.put(
      "http://localhost:9000/qa/questions/1/report",
    );

    expect(response.status).toBe(204);
    expect(response.config.method).toBe("put");
  });
});

describe("Testing the data types that is in the response when -> PUT request -> /qa/answers/1/helpful", () => {
  test("Testing PUT request for endpoint helpful for a specific question", async () => {
    const response = await axios.put(
      "http://localhost:9000/qa/answers/1/helpful",
    );

    expect(response.status).toBe(204);
    expect(response.config.method).toBe("put");
  });
});

describe("Testing the data types that is in the response when -> PUT request -> /qa/answers/1/report", () => {
  test("Testing PUT request for endpoint reported for a specific question", async () => {
    const response = await axios.put(
      "http://localhost:9000/qa/answers/1/report",
    );

    expect(response.status).toBe(204);
    expect(response.config.method).toBe("put");
  });
});
