import express, { Router, Request, Response } from "express";
// import { Flower, flowerRequest } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { ScheduleForm } from "common/src/interfaces/roomScheduleReq.ts";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const requestForm: ScheduleForm = req.body;
  console.log(requestForm);
  const dateConvert = new Date(requestForm.date);

  try {
    await PrismaClient.internalTransportRequest.create({
      data: {
        name: requestForm.name,
        locationFrom: requestForm.locationFrom,
        locationTo: requestForm.locationTo,
        reason: requestForm.reason,
        time: requestForm.time,
        priority: requestForm.priority,
        status: requestForm.status,
        note: requestForm.note,
        date: dateConvert,
      },
    });
    console.info("Successfully requested flowers");
    res.status(200).json({ message: "Flower requests created successfully" });
  } catch (error) {
    // Log any failures
    console.error(`Unable to save flower request ${req}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async (req: Request, res: Response) => {
  const transportRequest =
    await PrismaClient.internalTransportRequest.findMany();
  res.send(transportRequest);
});

export default router;
