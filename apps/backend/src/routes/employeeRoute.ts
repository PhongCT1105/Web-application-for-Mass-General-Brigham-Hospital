import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

interface employee {
  id: number;
  fName: string;
  lName: string;
  title: string;
}
router.post("/", async (req: Request, res: Response) => {
  try {
    const employee: employee = req.body;
    console.log(employee);

    await PrismaClient.employee.create({
      data: {
        id: employee.id,
        fName: employee.fName,
        lName: employee.lName,
        title: employee.title,
      },
    });
    console.info("Successfully requested employee data");
    res.status(200).json({ message: "Employee data created successfully" });
  } catch (error) {
    //log any failures
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
