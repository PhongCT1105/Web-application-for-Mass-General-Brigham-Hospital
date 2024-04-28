import express, { Router, Request, Response } from "express";
import client from "../bin/database-connection.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  res.sendStatus(200); // Otherwise say it's fine
});

router.get("/nodes-traveled", async (req, res) => {
  try {
    const data = await client.nodesTraveled.findMany();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Heatmap Node Find Error" });
  }
});

export default router;
