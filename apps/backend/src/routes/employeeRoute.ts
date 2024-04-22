import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

const router: Router = express.Router();

interface employeeTable {
  id: number;
  fName: string;
  lName: string;
  title: string;
}

router.post("/", async (req, res) => {
  console.log("hey this is being called for employee");

  const data = req.body;
  const jsonString = JSON.stringify(data);
  const employeeData: employeeTable[] = JSON.parse(jsonString);

  try {
    await prisma.employee.deleteMany();

    for (let i = 0; i < employeeData.length; i++) {
      const employee = employeeData[i];
      console.log(employee);

      await prisma.employee.create({
        data: {
          id: parseInt(String(employee.id)),
          fName: employee.fName,
          lName: employee.lName,
          title: employee.title,
        },
      });
    }
    res.status(200).send("Node data imported successfully.");
  } catch (error) {
    console.error("Error processing node data:", error);
    res.status(400).send("Bad request");
  }
});
// router.post("/", async (req: Request, res: Response) => {
//   const employee = req.body;
//   try {
//     // const employee = req.body;
//     console.log("ROUTER.POST IN EMPLOYEE ROUTE");
//     console.log(employee);
//
//     employee.id = parseInt(String(employee.id));
//     console.log(employee);
//     console.log(typeof employee.id);
//
//     await PrismaClient.employee.create({
//       data: {
//         //id: parseInt(String(employee.id)),
//         fName: employee.fName,
//         lName: employee.lName,
//         title: employee.title,
//       },
//     });
//     console.info("Successfully requested employee data");
//     res.status(200).json({ message: "Employee data created successfully" });
//   } catch (error) {
//     //log any failures
//     console.error(error);
//     console.log(employee);
//     console.error("Unable to upload employee data  ${req}: ${error}");
//     //send error
//     res.sendStatus(400);
//     //Don't try to send duplicate statuses
//     return;
//   }
// });

router.get("/", async function (employee: Request, res: Response) {
  const employeeData = await prisma.employee.findMany();
  res.send(employeeData);
});

export default router;
