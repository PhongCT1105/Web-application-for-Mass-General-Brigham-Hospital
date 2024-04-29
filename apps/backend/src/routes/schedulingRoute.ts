// import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";

interface scheduling {
  task: number;
  weekday: number;
  shift: number;
  priority: number;
  status: number;
  employee?: number;
}

const router: Router = express.Router();
router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;

  try {
    for (const event of events) {
      event.employee = 6;
    }
    console.log("Backend response: " + events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error: ", error);
    res.status(400);
  }
});

export default router;
