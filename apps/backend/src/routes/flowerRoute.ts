import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import {flowerReq} from "common/scr/flowerReq.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const flowerReq: Prisma.flowerRequestCreateManyInput = req.body;
  // Attempt to save the high score
  try {
    // Attempt to create in the database
    await PrismaClient.flowerRequest.createMany({ data: flowerReq });
    console.info("Successfully requested flowers"); // Log that it was successful
  } catch (error) {
    // Log any failures
    console.error(`Unable to save high score attempt ${flowerReq}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }

  res.sendStatus(200); // Otherwise say it's fine
});

// Whenever a get request is made, return the high score
router.get("/", async function (req: Request, res: Response) {
  // Fetch the high score from Prisma
  const highScore = await PrismaClient.highScore.findFirst({
    orderBy: {
      score: "desc",
    },
  });

  // If the high score doesn't exist
  if (highScore === null) {
    // Log that (it's a problem)
    console.error("No high score found in database!");
    res.sendStatus(204); // and send 204, no data
  } else {
    // Otherwise, send the score
    res.send(highScore);
  }
});

export default router;
