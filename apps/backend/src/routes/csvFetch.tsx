import express from "express";
import multer from "multer";
import { Pool } from "pg";
import { parse } from "csv-parse";

interface Node {
  id: number;
  name: string;
  // Add more properties as needed
}

interface Edge {
  source: number;
  target: number;
  weight: number;
  // Add more properties as needed
}

interface ParsedRow {
  type: "node" | "edge";
  id: string;
  name: string;
  source?: string;
  target?: string;
  weight?: string;
  // Add more properties as needed
}

const app = express();
const upload = multer({ dest: "uploads/" });
const pool = new Pool({
  user: "teamc",
  host: "database.cs.wpi.edu",
  database: "teamcdb",
  password: "teamc30",
  port: 5432, // PostgreSQL port
});

app.post("/import-csv", upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Read CSV file using csv-parse
    const csvData = req.file.buffer.toString(); // Assumes file buffer contains CSV data

    // Parse CSV data with specific type
    const parsedData = await new Promise<ParsedRow[]>((resolve, reject) => {
      parse(csvData, { columns: true }, (err, output) => {
        if (err) reject(err);
        else resolve(output);
      });
    });

    if (!parsedData || parsedData.length === 0) {
      return res.status(400).send("Empty or invalid CSV data.");
    }

    // Separate nodes and edges from parsed data
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    for (const row of parsedData) {
      if (row.type === "node") {
        nodes.push({
          id: parseInt(row.id),
          name: row.name,
          // Add more properties as needed
        });
      } else if (row.type === "edge") {
        edges.push({
          source: parseInt(row.source!),
          target: parseInt(row.target!),
          weight: parseInt(row.weight!),
          // Add more properties as needed
        });
      }
    }

    // Insert nodes into PostgreSQL
    await insertNodes(nodes);

    // Insert edges into PostgreSQL
    await insertEdges(edges);

    res.status(200).send("CSV data imported successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function insertNodes(nodes: Node[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start a transaction

    for (const node of nodes) {
      // Insert node into the nodes table
      await client.query(
        "INSERT INTO nodes (id, name, ...) VALUES ($1, $2, ...)",
        [
          node.id,
          node.name,
          // Add more values as needed
        ],
      );
    }

    await client.query("COMMIT"); // Commit the transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Roll back the transaction on error
    console.error("Error inserting nodes:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function insertEdges(edges: Edge[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start a transaction

    for (const edge of edges) {
      // Insert edge into the edges table
      await client.query(
        "INSERT INTO edges (source, target, weight, ...) VALUES ($1, $2, ...)",
        [
          edge.source,
          edge.target,
          edge.weight,
          // Add more values as needed
        ],
      );
    }

    await client.query("COMMIT"); // Commit the transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Roll back the transaction on error
    console.error("Error inserting edges:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
