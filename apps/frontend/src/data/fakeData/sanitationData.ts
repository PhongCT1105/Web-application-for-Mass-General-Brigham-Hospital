import { faker } from "@faker-js/faker";
import axios from "axios";

export const sanitationData = Array.from({ length: 1000 }, () => ({
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
  typeOfIssue: faker.word,
  description: faker.lorem.sentence(),
  comments: faker.lorem.sentence(),
}));

async function submit() {
  try {
    console.log("Running");
    const res = await axios.post("/api/sanitationReq", sanitationData, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Success:", res.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

submit().then(() => {
  console.log(sanitationData);
  console.log("Submitted fake data to backend");
});
