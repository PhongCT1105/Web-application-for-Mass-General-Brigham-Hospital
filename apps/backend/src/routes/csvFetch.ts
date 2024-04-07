import { PrismaClient } from "database";
import express, { Router } from "express";

const prisma = new PrismaClient();
const router: Router = express.Router();

// Node stuff good, just copy the format
router.post("/node", async (req, res) => {
  console.log("hey this is being called");

  const data: {
    nodeID: string;
    xcoord: number;
    ycoord: number;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
  }[] = req.body;
  console.log(`BACKEND: ${data}`);
  try {
    // Check if file is uploaded
    // if (!req.file) {
    //   console.log("no file");
    //   return res.status(400).json("fun cancelled: no file."); //No file uploaded
    // }

    // await prisma.edges.deleteMany();
    // await prisma.nodes.deleteMany();

    // for (let i = 0; i < data.length; i++) {
    //   await prisma.nodes.create({
    //     data: data[i],
    //   });
    //
    // }
    prisma.nodes.createMany({ data, skipDuplicates: true });

    res.status(200).send("CSV data imported successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(400).send("Bad request");
  }
});

router.get("/clearnodes", async (req, res) => {
  await prisma.edges.deleteMany();
  await prisma.nodes.deleteMany();

  res.status(200).json("Cleared nodes and edges");
});

router.post("/edge", async (req, res) => {
  console.log("hey this is being called");
  const data: {
    eID: string;
    startNodeID: string;
    endNodeID: string;
  }[] = req.body;

  try {
    //await prisma.edges.deleteMany();
    for (let i = 0; i < data.length; i++) {
      await prisma.edges.create({
        data: data[i],
      });
    }

    res.status(200).send("CSV data imported successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(400).send("Bad request");
  }
});

router.get("/node", async (req, res) => {
  try {
    const nodes = await prisma.nodes.findMany();
    res.status(200).json(nodes);
  } catch (error) {
    console.error("Error fetching nodes:", error);
    res.status(500).send("Internal server error");
  }
});

// Fetch edges from the database and send them as a response
router.get("/edge", async (req, res) => {
  try {
    const edges = await prisma.edges.findMany();
    res.status(200).json(edges);
  } catch (error) {
    console.error("Error fetching edges:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
