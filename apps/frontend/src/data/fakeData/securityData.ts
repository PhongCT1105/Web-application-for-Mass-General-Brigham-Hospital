import { faker } from "@faker-js/faker";
// import axios from "axios";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";

const securityData: SecurityForm[] = Array.from({ length: 100 }, () => ({
  reqID: faker.number.int(),
  ename: faker.person.firstName(),
  location: faker.location.city(),
  employee: faker.person.firstName(),
  call: faker.datatype.boolean(),
  priority: faker.helpers.arrayElement(["low", "medium", "high"]),
  status: faker.helpers.arrayElement(["pending", "in-progress", "completed"]),
  situation: faker.lorem.sentence(),
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
