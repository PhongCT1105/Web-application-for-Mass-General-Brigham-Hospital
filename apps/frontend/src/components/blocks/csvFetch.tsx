import express from "express";
import { Pool } from "pg";
import { stringify } from "csv-stringify";

const app = express();
const pool = new Pool({
  user: "teamc",
  host: "database.cs.wpi.edu",
  database: "teamcdb",
  password: "teamc30",
  port: 5432, // PostgreSQL port
});

app.get("/export-csv", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM your_table");
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).send("No data found.");
    }

    // Convert data to CSV format using csv-stringify
    stringify(result.rows, { header: true }, (err, output) => {
      if (err) {
        console.error("Error exporting CSV:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.header("Content-Type", "text/csv");
        res.attachment("exported_data.csv");
        res.send(output);
      }
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
