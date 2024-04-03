import React, { useState } from "react";
import { parse, ParseResult } from "papaparse";

interface CSVRow {
  // Define the structure of each row in the CSV data
  id: number;
  name: string;
  age: number;
  // Add more properties as needed based on your CSV columns
}

interface CSVTableProps {
  csvData: CSVRow[];
}

const CSVTable: React.FC<CSVTableProps> = ({ csvData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      parse(file, {
        header: true,
        complete: (result: ParseResult<CSVRow>) => {
          // Process the CSV data as needed
          console.log("Parsed CSV data:", result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <table>
        <thead>
          <tr>
            {/* Render table headers based on CSV column names */}
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows with CSV data */}
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTable;
