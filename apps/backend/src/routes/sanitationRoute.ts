import express, { Router, Request, Response } from "express";

import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

type rStatus = "Unassigned" | "Assigned" | "InProgress" | "Closed" | "";
type rSeverity = "Low" | "Medium" | "High" | "Emergency" | "";
type rTypeOfIssue =
  | "Spill"
  | "Leak"
  | "BodilyFluid"
  | "FoulOdor"
  | "Garbage"
  | "BrokenEquipment"
  | "Other"
  | "";

interface RequestForm {
  name: string;
  severity: rSeverity;
  location: string;
  typeOfIssue: rTypeOfIssue;
  time: string;
  status: rStatus;
  description: string;
  comments: string;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestBody = req.body;
    console.log(requestBody);
    const jsonString = JSON.stringify(requestBody);
    console.log("JSON String:", jsonString);

    // Parse the JSON string back into an object
    const requestForm: RequestForm = JSON.parse(jsonString);
    console.log(requestForm);

    await PrismaClient.sanitationRequest.create({
      data: {
        name: requestForm.name,
        severity: requestForm.severity,
        location: requestForm.location,
        typeOfIssue: requestForm.typeOfIssue,
        time: requestForm.time,
        status: requestForm.status,
        description: requestForm.description,
        comments: requestForm.comments,
      },
    });
    console.info("Successfully requested sanitation services");
    res
      .status(200)
      .json({ message: "sanitation service request created successfully" });
  } catch (error) {
    // Log any failures
    console.error(`Unable to save sanitation service request ${req}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async function (flowerReq: Request, res: Response) {
  const sanitationRequest = await PrismaClient.sanitationRequest.findMany();
  res.send(sanitationRequest);
});

export default router;
