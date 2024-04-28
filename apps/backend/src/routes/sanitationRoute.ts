import express, { Router, Request, Response } from "express";

import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// type rStatus = "Unassigned" | "Assigned" | "InProgress" | "Closed" | "";
// type rSeverity = "Low" | "Medium" | "High" | "Emergency" | "";
// type rTypeOfIssue =
//   | "Spill"
//   | "BodilyFluid"
//   | "FoulOdor"
//   | "Garbage"
//   | "Other"
//   | "";

// interface RequestForm {
//   name: string;
//   severity: string;
//   location: string;
//   typeOfIssue: string;
//   time: string;
//   status: string;
//   description: string;
//   comments: string;
// }

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestForm = req.body;
    // console.log(requestBody);
    // const jsonString = JSON.stringify(requestBody);
    // console.log("JSON String:", jsonString);
    //
    // Parse the JSON string back into an object
    // const requestForm: RequestForm = requestBody;
    // console.log(requestForm);
    // for (const requestForm of requestData) {
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

    // Update the state of the Node if severity is high or emergency
    if (
      requestForm.severity === "High" ||
      requestForm.severity === "Emergency"
    ) {
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

    // }
    console.info("Successfully requested sanitation services and updated node");
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

router.get("/", async function (req: Request, res: Response) {
  try {
    const sanitationRequest = await PrismaClient.sanitationRequest.findMany();
    res.send(sanitationRequest);
  } catch (error) {
    // Log any failures
    console.error(`Unable to save sanitation service request ${req}: ${error}`);
    // Send error
    res.sendStatus(400);
    // Don't try to send duplicate statuses
    return;
  }
});

// router.get("/", async function (sanitationReq: Request, res: Response) {
//   const sanitationRequest = await PrismaClient.sanitationRequest.findMany();
//   res.send(sanitationRequest);
// });

export default router;
