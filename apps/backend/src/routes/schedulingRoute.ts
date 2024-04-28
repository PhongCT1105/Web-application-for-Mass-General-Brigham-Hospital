// import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";

interface scheduling {
  task: string;
  weekday: string;
  shift: 1 | 2 | 3 | 4;
  priority: string;
  status: string;
  employee?: string;
}

const router: Router = express.Router();
router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;

  try {
    for (const event of events) {
      event.employee = "Mina";
    }
    console.log("Backend response: " + events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error: ", error);
    res.status(400);
  }
});

export default router;
