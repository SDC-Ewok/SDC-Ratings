import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 1000, //stimulate how many virtual users
  duration: "30s", //how long you want it to run
};
//Below randomize the endpoints
export default function () {
  //http.get(`http://localhost:3000/reviews/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`);
  http.get(`http://localhost:3000/reviews/meta?id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`);
}

// import http from 'k6/http';
// import { sleep } from 'k6';
// export const options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1500, // "try to start 1500 reqs every [timeUnitVal] aka (1s)"
//       timeUnit: '1s',
//       duration: '15s',
//       preAllocatedVUs: 100, // The number of VUs to pre-allocate before the test starts.
//       maxVUs: 1000
//     }
//   }
// }
// const id = Math.floor(Math.random() * 1000011);
// const urlProduct = `http://localhost:3000/reviews/?product_id=${id}`;

// export default function () {
//   http.get(urlProduct);
//   sleep(1);
// }