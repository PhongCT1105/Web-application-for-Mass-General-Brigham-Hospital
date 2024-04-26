import { faker } from "@faker-js/faker";
// import axios from "axios";
import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";
import { EmployeeNames } from "@/interfaces/dataTypes/employeeNames.ts";
import { priorities, statuses } from "@/interfaces/dataTypes/labels.ts";

const scheduleFormData: ScheduleForm[] = Array.from({ length: 100 }, () => ({
  time: faker.date.anytime().toDateString(),
  status: faker.helpers.arrayElement(statuses).value,
  reqID: faker.number.int(),
  employeeName: faker.helpers.arrayElement(EmployeeNames).value,
  patientName: faker.person.firstName(),
  locationFrom: faker.location.city(),
  locationTo: faker.location.city(),
  reason: faker.word.adjective(),
  priority: faker.helpers.arrayElement(priorities).value,
  note: faker.lorem.sentence(),
  date: new Date(faker.date.weekday()),
  dateSubmitted: faker.date.recent().toDateString(),
}));

submitDataOnce("transportSubmitted", scheduleFormData, "/api/transport");
//
// async function submit() {
//     try {
//         console.log("Running");
//         const res = await axios.post("/api/transport", scheduleFormData, {
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
// submit().then(() => {
//     console.log(scheduleFormData);
//     console.log("Submitted fake data to backend");
// });
