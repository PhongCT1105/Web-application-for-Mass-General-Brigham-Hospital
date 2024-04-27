import { faker } from "@faker-js/faker";
// import axios from "axios";
import { Medication, MedicationForm } from "@/interfaces/medicationReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";
import { priorities } from "@/interfaces/dataTypes/medicationData/labels";
import { statuses } from "@/interfaces/dataTypes/medicationData/labels.ts";
import { EmployeeNames } from "@/interfaces/dataTypes/medicationData/employeeNames";

const generateFakeMedication = (): Medication => ({
  id: faker.number.int({ max: 2147483647 }),
  name: faker.commerce.productName(),
  priority: faker.helpers.arrayElement(priorities).value,
  status: faker.helpers.arrayElement(statuses).value,
  price: Number(faker.finance.amount()),
  quantity: faker.number.int({ max: 2147483647 }),
});

const medicationData: MedicationForm[] = Array.from({ length: 40 }, () => ({
  id: faker.number.int(),
  medication: Array.from({ length: 5 }, () => generateFakeMedication()),
  employee: faker.helpers.arrayElement(EmployeeNames).value,
  location: faker.location.city(),
  patient: faker.person.firstName(),
  dateSubmitted: faker.date.weekday(),
}));

submitDataOnce("medicationSubmitted", medicationData, "/api/medicationReq");
//
// async function submitMedicationData() {
//     try {
//         console.log("Running");
//         const res = await axios.post("/api/medicationReq", medicationData, {
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
// submitMedicationData().then(() => {
//     console.log(medicationData);
//     console.log("Submitted fake medication data to backend");
// });
