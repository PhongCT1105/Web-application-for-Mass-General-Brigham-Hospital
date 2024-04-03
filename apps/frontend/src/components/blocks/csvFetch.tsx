import express from "express";
import multer from "multer";
import { Pool } from "pg";
import { stringify } from "csv-stringify";
import { parse } from "csv-parse"; // Correct import for csv-parse parse function

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

    // Use csv-parse parse function correctly
    const parsedData = await parse(csvData, { columns: true });

    if (!parsedData || !Array.isArray(parsedData) || parsedData.length === 0) {
      return res.status(400).send("Empty or invalid CSV data.");
    }

    // Insert data into PostgreSQL using pg library and the pool
    const client = await pool.connect();
    await client.query("BEGIN"); // Start a transaction

    try {
      // Insert each row from the CSV into the database
      for (const row of parsedData) {
        await client.query(
          "INSERT INTO your_table_name (column1, column2, ...) VALUES ($1, $2, ...)",
          [
            row.column1,
            row.column2,
            // Add more values as needed
          ],
        );
      }

      await client.query("COMMIT"); // Commit the transaction
      res.status(200).send("CSV data imported successfully.");
    } catch (error) {
      await client.query("ROLLBACK"); // Roll back the transaction on error
      console.error("Error importing CSV:", error);
      res.status(500).send("Internal Server Error");
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/export-csv", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM your_table_name");
    client.release();

    if (!result || !result.rows || result.rows.length === 0) {
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
