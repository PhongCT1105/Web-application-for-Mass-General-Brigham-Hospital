import express, { Router, Request, Response } from "express";

import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// type rStatus = "Unassigned" | "Assigned" | "InProgress" | "Closed" | "";
// type rSeverity = "Low" | "Medium" | "High" | "Emergency" | "";
// type rTypeOfIssue =
//   | "BrokenEquipment"
//   | "PowerIssue"
//   | "PlumbingIssue"
//   | "ElevatorIssue"
//   | "Other"
//   | "";

// interface RequestForm {
//   name: string;
//   severity: string;
//   location: string;
//   typeOfIssue: string;
//   status: string;
//   description: string;
// }

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestForm = req.body;
    // console.log(requestBody);
    // const jsonString = JSON.stringify(requestBody);
    // console.log("JSON String:", jsonString);
    //
    // Parse the JSON string back into an object
    // const requestForms: RequestForm = JSON.parse(jsonString);
    // console.log(requestForm);

    // for (const requestForm of requestForms) {
    await PrismaClient.maintenanceRequest.create({
      data: {
        name: requestForm.name,
        severity: requestForm.severity,
        location: requestForm.location,
        typeOfIssue: requestForm.typeOfIssue,
        status: requestForm.status,
        description: requestForm.description,
      },
    });
    // }
    // elevator anything but low
    // plumbing all
    let update = false;

    if (requestForm.status != "Closed") {
      if (requestForm.typeOfIssue === "PlumbingIssue") {
        update = true;
      }

      if (requestForm.typeOfIssue === "ElevatorIssue") {
        update = true;
        if (requestForm.severity === "Low") {
          update = false;
        }
      }
    }

    if (update) {
      const updatedNode = await PrismaClient.nodes.update({
        where: {
          nodeID: requestForm.location, // Assuming NodeID is provided in the request body
        },
        data: {
          obstacle: true,
        },
      });
      console.log("Updated Node:", updatedNode);
      if (!updatedNode) {
        // If the node was not found or not updated, throw an error
        console.log("Node not found or could not be updated");
      }
    }

    console.info("Successfully requested maintenance services");
    res
      .status(200)

      .json({ message: "maintenance service request created successfully" });
  } catch (error) {
    // Log any failures
    console.error(
      `Unable to save maintenance service request ${req}: ${error}`,
    );
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async function (req: Request, res: Response) {
  try {
    const maintenanceRequest = await PrismaClient.maintenanceRequest.findMany();
    res.send(maintenanceRequest);
  } catch (error) {
    // Log any failures
    console.error(
      `Unable to save maintenance service request ${req}: ${error}`,
    );
    // Send error
    res.sendStatus(400);
    // Don't try to send duplicate statuses
    return;
  }
});

router.get("/", async function (maintenanceReq: Request, res: Response) {
  const maintenanceRequest = await PrismaClient.maintenanceRequest.findMany();
  res.send(maintenanceRequest);
});

export default router;
