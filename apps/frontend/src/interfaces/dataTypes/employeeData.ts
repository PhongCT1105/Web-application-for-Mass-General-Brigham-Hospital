import { faker } from "@faker-js/faker";
import { Employee } from "../employeeInterface.ts";

export const employeeData: Employee[] = Array.from({ length: 1 }, () => ({
  id: faker.number.int({ min: 0, max: 100 }),
  fName: faker.person.firstName(),
  lName: faker.person.lastName(),
  title: faker.person.jobTitle(),
}));
