import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// type rPriority = "low" | "medium" | "high" | "emergency";
//
// type rStatus = "unassigned" | "assigned" | "inprogress" | "closed";

// interface RequestForm {
//   ename: string;
//   location: string;
//   situation: string;
//   call: boolean;
//   status: rStatus;
//   priority: rPriority;
// }

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestForms = req.body;
    // console.log(requestForm);

    for (const requestForm of requestForms) {
      await PrismaClient.securityRequest.create({
        data: {
          ename: requestForm.ename,
          location: requestForm.location,
          employee: requestForm.employee,
          situation: requestForm.situation,
          call: requestForm.call,
          status: requestForm.status,
          priority: requestForm.priority,
          dateSubmitted: requestForm.dateSubmitted,
        },
      });
    }
    console.info("Successfully requested security services");
    res
      .status(200)
      .json({ message: "Security service request created successfully" });
  } catch (error) {
    //log any failures
    console.error(
      "Unable to save sanitation service request  ${req}: ${error}",
    );
    //send error
    res.sendStatus(400);
    //Don't try to send duplicate statuses
    return;
  }
});

router.get("/", async function (sanitationReq: Request, res: Response) {
  const securityRequest = await PrismaClient.securityRequest.findMany();
  res.send(securityRequest);
});

export default router;
