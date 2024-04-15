import express, { Router, Request, Response } from "express";
import client from "../bin/database-connection.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  res.sendStatus(200); // Otherwise say it's fine
});

router.get("/nodes", async (req, res) => {
  try {
    const data = await client.nodes.findMany();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Pathfinding Error" });
  }
});

router.get("/nodes/:nodeid", async (req, res) => {
  const nodeID = req.params.nodeid;

  const data = await client.nodes.findUnique({
    where: {
      nodeID: nodeID,
    },
  });

  res.status(200).json(data);
});

router.get("/edges", async (req, res) => {
  const data = await client.edges.findMany();

  res.status(200).json(data);
});

export default router;
