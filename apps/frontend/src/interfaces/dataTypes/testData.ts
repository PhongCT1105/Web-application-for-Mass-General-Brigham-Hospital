// import { priorities, statuses } from "./dataTypes/labels.ts";
import { faker } from "@faker-js/faker";
import { Medication } from "../medicationReq.ts";
// import fs from "fs";
// import path from "path";
// import { priorities, statuses } from "./dataTypes/labels.ts";
export const pillData: Medication[] = Array.from({ length: 100 }, () => ({
  id: faker.number.int({ min: 1000, max: 9999 }),
  name: faker.helpers.arrayElement([
    "Xanax",
    "Adderall",
    "Prozac",
    "Zoloft",
    "Ambien",
    "Ritalin",
    "Lexapro",
    "Vicodin",
    "Percocet",
    "OxyContin",
    "Valium",
    "Ativan",
    "Concerta",
    "Suboxone",
    "Klonopin",
    "Tramadol",
    "Seroquel",
    "Wellbutrin",
    "Vyvanse",
    "Hydrocodone",
  ]),
  // status: faker.helpers.arrayElement(statuses).value,
  // priority: faker.helpers.arrayElement(priorities).value,
  status: "",
  priority: "",
  price: faker.number.float({ min: 1.5, max: 100.99, fractionDigits: 2 }),
  quantity: 0,
}));

// let test;
// fs.writeFileSync(
//     path.join(__dirname, "test.json"),
//     JSON.stringify(test, null, 2)
// );
