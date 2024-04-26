import { faker } from "@faker-js/faker";
// import axios from "axios";
import { FlowerForm } from "@/interfaces/flowerReq.ts";
import { submitDataOnce } from "@/data/fakeData/submissionUtils.ts";

const flowerData: FlowerForm[] = Array.from({ length: 100 }, () => ({
  reqID: faker.number.int(),
  priority: faker.helpers.arrayElement(["low", "medium", "high"]),
  status: faker.helpers.arrayElement(["pending", "in-progress", "completed"]),
  cartItems: Array.from({ length: 5 }, () => ({
    fID: faker.number.int(),
    name: faker.commerce.productName(),
    cost: Number(faker.finance.amount()),
    reqID: faker.number.int(),
  })),
  total: Number(faker.finance.amount()),
  sender: faker.internet.email(),
  location: faker.location.city(),
  recipient: faker.person.firstName(),
  message: faker.lorem.sentence(),
  dateSubmitted: faker.date.recent(),
}));

submitDataOnce("flowerSubmmited", flowerData, "/api/flowerReq");

// async function submitFlowerData() {
//     try {
//         console.log("Running");
//         const res = await axios.post("/api/flowerReq", flowerData, {
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
// submitFlowerData().then(() => {
//     console.log(flowerData);
//     console.log("Submitted fake flower data to backend");
// });
