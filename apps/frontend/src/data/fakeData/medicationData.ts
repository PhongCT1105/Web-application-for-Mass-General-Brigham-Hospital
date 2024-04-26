import { faker } from "@faker-js/faker";
// import axios from "axios";
import { Medication, MedicationForm } from "@/interfaces/medicationReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";

const generateFakeMedication = (): Medication => ({
  id: faker.number.int({ max: 2147483647 }),
  name: faker.commerce.productName(),
  priority: faker.helpers.arrayElement(["low", "medium", "high"]),
  status: faker.helpers.arrayElement(["pending", "in-progress", "completed"]),
  price: Number(faker.finance.amount()),
  quantity: faker.number.int({ max: 2147483647 }),
});

const medicationData: MedicationForm[] = Array.from({ length: 100 }, () => ({
  id: faker.number.int(),
  medication: Array.from({ length: 5 }, () => generateFakeMedication()),
  employee: faker.person.firstName(),
  location: faker.location.city(),
  patient: faker.person.firstName(),
  dateSubmitted: faker.date.recent().toISOString(),
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
