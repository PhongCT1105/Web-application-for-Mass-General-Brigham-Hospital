import { faker } from "@faker-js/faker";
// import axios from "axios";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";
import { EmployeeNames } from "@/interfaces/dataTypes/employeeNames.ts";
import { priorities, statuses } from "@/interfaces/dataTypes/labels.ts";

const securityData: SecurityForm[] = Array.from({ length: 100 }, () => ({
  reqID: faker.number.int(),
  ename: faker.helpers.arrayElement(EmployeeNames).value,
  location: faker.location.city(),
  employee: faker.person.firstName(),
  call: faker.datatype.boolean(),
  priority: faker.helpers.arrayElement(priorities).value,
  status: faker.helpers.arrayElement(statuses).value,
  situation: faker.lorem.sentence(),
  dateSubmitted: faker.date.recent().toDateString(),
}));

submitDataOnce("securitySubmitted", securityData, "/api/securityReq");
// async function submitSecurityData() {
//     try {
//         console.log("Running");
//         const res = await axios.post("/api/securityReq", securityData, {
//             headers: {
//                 "content-type": "application/json",
//             },
//         });
//         console.log("Success:", res.data);
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
//
// submitSecurityData().then(() => {
//     console.log(securityData);
//     console.log("Submitted fake security data to backend");
// });
