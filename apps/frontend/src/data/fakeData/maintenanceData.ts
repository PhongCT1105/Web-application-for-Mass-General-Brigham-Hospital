import { faker } from "@faker-js/faker";
// import axios from "axios";
import { MaintenanceForm } from "@/interfaces/maintenanceReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";
import { EmployeeNames } from "@/interfaces/dataTypes/employeeNames.ts";
import { priorities, statuses } from "@/interfaces/dataTypes/labels.ts";

const maintenanceData: MaintenanceForm[] = Array.from({ length: 100 }, () => ({
  reqId: faker.number.int(),
  name: faker.helpers.arrayElement(EmployeeNames).value,
  location: faker.location.city(),
  typeOfIssue: faker.lorem.word(),
  severity: faker.helpers.arrayElement(priorities).value,
  status: faker.helpers.arrayElement(statuses).value,
  description: faker.lorem.sentence(),
  dateSubmitted: faker.date.recent().toDateString(),
}));

submitDataOnce("maintenanceSubmitted", maintenanceData, "/api/maintenanceReq");

// async function submitMaintenanceData() {
//     try {
//         console.log("Running");
//         const res = await axios.post("/api/maintenanceReq", maintenanceData, {
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
// submitMaintenanceData().then(() => {
//     console.log(maintenanceData);
//     console.log("Submitted fake maintenance data to backend");
// });
