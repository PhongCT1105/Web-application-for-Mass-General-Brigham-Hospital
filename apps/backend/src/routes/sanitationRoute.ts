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
    const requestForms = req.body;

    if (Array.isArray(requestForms)) {
      for (const requestForm of requestForms)
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
    } else {
      await PrismaClient.sanitationRequest.create({
        data: {
          name: requestForms.name,
          severity: requestForms.severity,
          location: requestForms.location,
          typeOfIssue: requestForms.typeOfIssue,
          time: requestForms.time,
          status: requestForms.status,
          description: requestForms.description,
          comments: requestForms.comments,
        },
      });

      if (
        requestForms.severity === "High" ||
        requestForms.severity === "Emergency"
      ) {
        const updatedNode = await PrismaClient.nodes.update({
          where: {
            nodeID: requestForms.location, // Assuming NodeID is provided in the request body
          },
          data: {
            obstacle: true,
          },
        });
        if (!updatedNode) {
          // If the node was not found or not updated, throw an error
          console.log("Node not found or could not be updated");
        }
        console.log(updatedNode);
      }
    }

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
