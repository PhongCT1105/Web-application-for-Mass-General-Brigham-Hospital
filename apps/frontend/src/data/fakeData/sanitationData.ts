import { faker } from "@faker-js/faker";
// import axios from "axios";
import { SanitationForm } from "@/interfaces/sanitationReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";

const sanitationData: SanitationForm[] = Array.from({ length: 100 }, () => ({
  reqId: faker.number.int(),
  name: faker.person.firstName(),
  location: faker.location.city(),
  time: faker.date.month(),
  severity: faker.helpers.arrayElement(["low", "medium", "high", "emergency"]),
  status: faker.helpers.arrayElement([
    "unassigned",
    "assigned",
    "in-progress",
    "closed",
  ]),
  typeOfIssue: faker.word.adjective(),
  description: faker.lorem.sentence(),
  comments: faker.lorem.sentence(),
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
