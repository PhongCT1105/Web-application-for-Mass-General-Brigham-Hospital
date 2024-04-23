import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// interface employee {
//   id: number;
//   fName: string;
//   lName: string;
//   title: string;
// }
router.post("/", async (req: Request, res: Response) => {
  const employee = req.body;
  try {
    // const employee = req.body;
    console.log("ROUTER.POST IN EMPLOYEE ROUTE");
    console.log(employee);

    employee.id = parseInt(String(employee.id));
    console.log(employee);
    console.log(typeof employee.id);

    for (let i = 0; i < employee.length; i++) {
      await PrismaClient.employee.create({
        data: {
          //id: parseInt(String(employee.id)),
          fName: employee[i].fName,
          lName: employee[i].lName,
          title: employee[i].title,
        },
      });
    }

    console.info("Successfully requested employee data");
    res.status(200).json({ message: "Employee data created successfully" });
  } catch (error) {
    //log any failures
    console.error(error);
    console.log(employee);
    console.error("Unable to upload employee data  ${req}: ${error}");
    //send error
    res.sendStatus(400);
    //Don't try to send duplicate statuses
    return;
  }
});

router.get("/", async function (employee: Request, res: Response) {
  const employeeData = await PrismaClient.employee.findMany();
  res.send(employeeData);
});

export default router;
