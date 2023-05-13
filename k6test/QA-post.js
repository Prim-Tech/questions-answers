import http from "k6/http";
import { sleep, check } from "k6";

//FOR STAGING RAMP UP AND RAMP DOWN

// export let options = {
//   stages: [
//     { duration: "30s", target: 1000 },
//     { duration: "30s", target: 0 },
//   ],
//   //RPS
// };

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: "constant-arrival-rate",

      // Our test should last 30 seconds in total
      duration: "1m",

      // It should start 30 iterations per `timeUnit`. Note that iterations starting points
      // will be evenly spread across the `timeUnit` period.
      rate: 1000,

      // It should start `rate` iterations per second
      timeUnit: "1s",

      // It should preallocate 2 VUs before starting the test
      preAllocatedVUs: 1000,

      // It is allowed to spin up to 1000 maximum VUs to sustain the defined
      // constant arrival rate.

      maxVUs: 1000,
    },
  },
};

export default function () {
  // Send a GET request to a target URL

  var questionsObject = {
    body: "testing k6 adding questions",
    name: "k6 tester",
    email: "k6tester@gmail.com",
    product_id: 1,
  };

  var questions = http.post(
    "http://localhost:9000/qa/questions",
    questionsObject,
  );
  check(questions, { "status was 200": (r) => r.status === 201 });

  // var answersObject = {
  //   body: "k6 is the answer",
  //   name: "k6 tester",
  //   email: "k6tester@gmail.com",
  //   photos: ["k6 step 1", "k6 step 2", "k6 step 3"],
  // };

  // var answers = http.post(
  //   `http://localhost:9000/qa/questions/1/answers`,
  //   answersObject,
  // );
  // check(answers, { "status was 200": (r) => r.status === 201 });
}
