import { faker } from "@faker-js/faker";
// import axios from "axios";
import { SanitationForm } from "@/interfaces/sanitationReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";
import { EmployeeNames } from "@/interfaces/dataTypes/sanitationData/employeeNames";
import {
  priorities,
  statuses,
} from "@/interfaces/dataTypes/sanitationData/labels.ts";

const sanitationData: SanitationForm[] = Array.from({ length: 20 }, () => ({
  reqId: faker.number.int(),
  name: faker.helpers.arrayElement(EmployeeNames).value,
  location: faker.location.city(),
  time: faker.date.month(),
  severity: faker.helpers.arrayElement(priorities).value,
  status: faker.helpers.arrayElement(statuses).value,
  typeOfIssue: faker.word.adjective(),
  description: faker.lorem.sentence(),
  comments: faker.lorem.sentence(),
  dateSubmitted: faker.date.weekday(),
}));

submitDataOnce("sanitationSubmitted", sanitationData, "/api/sanitationReq");

// async function submit() {
//   try {
//     console.log("Running");
//     const res = await axios.post("/api/sanitationReq", sanitationData, {
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     console.log("Success:", res.data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
//
// submit().then(() => {
//   console.log(sanitationData);
//   console.log("Submitted fake data to backend");
// });
