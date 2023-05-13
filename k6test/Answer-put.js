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

      // It is allowed to spin up to 50 maximum VUs to sustain the defined
      // constant arrival rate.

      maxVUs: 1000,
    },
  },
};

export default function () {
  const min = 0; // minimum value
  const max = 7642983; // maximum value

  const id = Math.floor(Math.random() * (max - min + 1)) + min;

  var answerHelp = http.put(`http://localhost:9000/qa/answers/${id}/helpful`);
  check(answerHelp, { "status was 204": (r) => r.status === 204 });

  var answerReport = http.put(`http://localhost:9000/qa/answers/${id}/report`);
  check(answerReport, { "status was 204": (r) => r.status === 204 });
}
