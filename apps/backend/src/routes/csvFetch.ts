import { PrismaClient } from "database";
import express, { Router } from "express";
import multer from "multer";
// import { Pool } from "pg";
// import { parse } from "csv-parse";

//import { Prisma } from "database";
//import PrismaClient from "../bin/database-connection.ts";
//export * from "../.prisma/client";
//import {PrismaClient} from "../.prisma/client";

const prisma = new PrismaClient();
const router: Router = express.Router();
//
// // Define interfaces for node, edge, and parsed row
// interface Node {
//   id: number;
//   name: string;
// }
//
// interface Edge {
//   source: number;
//   target: number;
//   weight: number;
// }
//
// interface ParsedRow {
//   type: "node" | "edge";
//   id: string;
//   name: string;
//   source?: string;
//   target?: string;
//   weight?: string;
// }
//
// // Configure multer for file upload
const upload = multer({ dest: "uploads/" });
//
// // Set up PostgreSQL connection pool
// const pool = new Pool({
//   user: "teamc",
//   host: "database.cs.wpi.edu",
//   database: "teamcdb",
//   password: "teamc30",
//   port: 5432, // PostgreSQL port
// });

// router.post("/", async function (req: Request, res: Response) {
//     const flowerReq: cartItem = req.body;
//     // Attempt to save the high score
//     try {
//         // Attempt to create in the database
//         await PrismaClient.flowerRequest.createMany({ data: flowerReq });
//         console.info("Successfully requested flowers"); // Log that it was successful
//     } catch (error) {
//         // Log any failures
//         console.error(`Unable to save flower request ${flowerReq}: ${error}`);
//         res.sendStatus(400); // Send error
//         return; // Don't try to send duplicate statuses
//     }
//
//     res.sendStatus(200); // Otherwise say it's fine
// });
// Define route for importing CSV data
router.post("/node", upload.single("csvFile"), async (req, res) => {
  console.log("hey this is being called");
  try {
    // Check if file is uploaded
    if (!req.file) {
      console.log("no file");
      return res.status(400).send("fun cancelled: no file."); //No file uploaded
    }

    await prisma.nodes.deleteMany();
    await prisma.nodes.createMany({
      data: req.body,
    });

    // const nodesData: string[] = nodesCSV.trim().split("\n").slice(1);
    // const nodes = nodesData.map((nodesData) => {
    //   const [
    //     nodeID,
    //     xcoord,
    //     ycoord,
    //     floor,
    //     building,
    //     nodeType,
    //     longName,
    //     shortName,
    //   ] = nodesData.split(",");
    //   return {
    //     nodeID,
    //     xcoord: parseInt(xcoord),
    //     ycoord: parseInt(ycoord),
    //     floor,
    //     building,
    //     nodeType,
    //     longName,
    //     shortName,
    //   };
    // });

    //await prisma// Read CSV file using csv-parse
    //const csvData = req.file.buffer.toString(); // Assumes file buffer contains CSV data

    // Parse CSV data with specific type
    // const parsedData = await new Promise<ParsedRow[]>((resolve, reject) => {
    //   parse(csvData, { columns: true }, (err, output) => {
    //     if (err) reject(err);
    //     else resolve(output);
    //   });
    // });

    // Check if parsed data is empty or invalid
    // if (!parsedData || parsedData.length === 0) {
    //   return res.status(400).send("Empty or invalid CSV data.");
    // }

    // // Separate nodes and edges from parsed data
    // const nodes: Node[] = [];
    // const edges: Edge[] = [];
    // for (const row of parsedData) {
    //   if (row.type === "node") {
    //     nodes.push({
    //       id: parseInt(row.id),
    //       name: row.name,
    //     });
    //   } else if (row.type === "edge") {
    //     edges.push({
    //       source: parseInt(row.source!),
    //       target: parseInt(row.target!),
    //       weight: parseInt(row.weight!),
    //     });
    //   }
    // }

    // // Insert nodes into PostgreSQL
    // await insertNodes(nodes);
    //
    // // Insert edges into PostgreSQL
    // await insertEdges(edges);

    res.status(200).send("CSV data imported successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(400).send("Bad request");
  }
});

router.post("/edge", upload.single("csvFile"), async (req, res) => {
  console.log("hey this is being called");
  try {
    // Check if file is uploaded
    // if (!req.file) {
    //   console.log("no file");
    //   return res.status(400).send("fun cancelled: no file."); //No file uploaded
    // }

    await prisma.edges.deleteMany();
    await prisma.edges.createMany({
      data: req.body,
    });

    res.status(200).send("CSV data imported successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(400).send("Bad request");
  }
});

// Function to insert nodes into PostgreSQL
// async function insertNodes(nodes: Node[]) {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN"); // Start a transaction
//
//     for (const node of nodes) {
//       // Insert node into the nodes table
//       await client.query(
//         "INSERT INTO nodes (id, name, ...) VALUES ($1, $2, ...)",
//         [
//           node.id,
//           node.name,
//           // Add more values as needed
//         ],
//       );
//     }
//
//     await client.query("COMMIT"); // Commit the transaction
//   } catch (error) {
//     await client.query("ROLLBACK"); // Roll back the transaction on error
//     console.error("Error inserting nodes:", error);
//     throw error;
//   } finally {
//     client.release(); // Release the client back to the pool
//   }
// }
//
// // Function to insert edges into PostgreSQL
// async function insertEdges(edges: Edge[]) {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN"); // Start a transaction
//
//     for (const edge of edges) {
//       // Insert edge into the edges table
//       await client.query(
//         "INSERT INTO edges (source, target, weight, ...) VALUES ($1, $2, ...)",
//         [
//           edge.source,
//           edge.target,
//           edge.weight,
//           // Add more values as needed
//         ],
//       );
//     }
//
//     await client.query("COMMIT"); // Commit the transaction
//   } catch (error) {
//     await client.query("ROLLBACK"); // Roll back the transaction on error
//     console.error("Error inserting edges:", error);
//     throw error;
//   } finally {
//     client.release(); // Release the client back to the pool
//   }
// }

export default router;
