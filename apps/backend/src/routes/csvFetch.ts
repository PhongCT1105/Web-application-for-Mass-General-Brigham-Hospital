import { PrismaClient } from "database";
import express, { Router } from "express";

const prisma = new PrismaClient();
const router: Router = express.Router();

interface nodeTable {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

interface edgeTable {
  edgeID: string;
  startNode: string;
  endNode: string;
}

// Node stuff good, just copy the format
// router.post("/node", async (req, res) => {
//   console.log("hey this is being called for node");
//
//   const data = req.body;
//   const jsonString = JSON.stringify(data);
//   const nodeData: nodeTable[] = JSON.parse(jsonString);
//   try {
//     await prisma.nodes.deleteMany();
//     for (let i = 0; i < nodeData.length; i++) {
//       await prisma.nodes.create({
//         data: nodeData[i],
//       });
//     }
//
//     res.status(200).send("CSV data imported successfully.");
//   } catch (error) {
//     console.error("Error processing CSV file:", error);
//     res.status(400).send("Bad request");
//   }
// });
router.post("/node", async (req, res) => {
  console.log("hey this is being called for node");

  const data = req.body;
  const jsonString = JSON.stringify(data);
  const nodeData: nodeTable[] = JSON.parse(jsonString);
  try {
    // Don't delete edges here
    // await prisma.nodes.deleteMany();

    // Iterate over nodeData and create or update nodes
    for (let i = 0; i < nodeData.length; i++) {
      const node = nodeData[i];
      // Find existing node by nodeID
      const existingNode = await prisma.nodes.findUnique({
        where: {
          nodeID: node.nodeID,
        },
      });

      if (existingNode) {
        // If node exists, update it
        await prisma.nodes.update({
          where: {
            nodeID: node.nodeID,
          },
          data: {
            ...node,
            ycoord: parseInt(String(node.ycoord)),
            xcoord: parseInt(String(node.xcoord)),
          },
        });
      } else {
        // If node doesn't exist, create it
        await prisma.nodes.create({
          data: node,
        });
      }
    }

    res.status(200).send("Node data imported successfully.");
  } catch (error) {
    console.error("Error processing node data:", error);
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
  const data = req.body;
  const jsonString = JSON.stringify(data);
  const edgeData: edgeTable[] = JSON.parse(jsonString);
  try {
    await prisma.edges.deleteMany();
    for (let i = 0; i < edgeData.length; i++) {
      await prisma.edges.create({
        data: edgeData[i],
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
