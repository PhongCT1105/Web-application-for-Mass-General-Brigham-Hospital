import React, { useState } from "react";
import "@/styles/CSVTable.css"; // Import CSS file for table styling
import { Header } from "@/components/blocks/header.tsx";
import axios from "axios";
//import * as fs from "fs";
import { parse, ParseResult } from "papaparse";

interface CSVData {
  [key: string]: string; // Assuming all values in CSV are strings, adjust as needed
}

const CSVTable: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [jsonData, setJsonData] = useState<CSVData[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>(""); // Upload status message

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      importCSV(file)
        .then((data) => {
          setJsonData(data); // Update the state with parsed JSON data
          setUploadStatus("File imported successfully.");
          setTimeout(() => {
            setUploadStatus("");
          }, 3000); // Clear upload status message after 3 seconds
        })
        .catch((error) => {
          console.error("Error importing file:", error);
          setUploadStatus("Error importing file. Please try again.");
        });
    }
  };

  // error uploading csv file: error: error uploading csv file
  // err_aborted 404 (not found)
  const capitalizeTableColumn = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const exportCSV = () => {
    const csvContent = jsonData
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const importCSV = async (file: File): Promise<CSVData[]> => {
    return new Promise<CSVData[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;

        // Parse CSV text using papaparse
        const parsedData: ParseResult<string[]> = parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        if (parsedData.errors.length > 0) {
          reject(
            new Error("Error parsing CSV: " + parsedData.errors[0].message),
          );
          return;
        }

        // Convert parsed data to JSON format
        const jsonData: CSVData[] = parsedData.data.map((row) => {
          const rowData: CSVData = {};
          for (const key in row) {
            if (Object.prototype.hasOwnProperty.call(row, key)) {
              rowData[key] = row[key] as string;
            }
          }
          return rowData;
        });

        resolve(jsonData);
      };
      reader.onerror = (error) => reject(error);

      reader.readAsText(file);
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    setUploading(true);
    console.log(selectedFile);
    const jsonData = await importCSV(selectedFile);

    if (selectedFile.name.includes("L1Nodes.csv")) {
      const redefinedJsonData = jsonData as {
        nodeID: string;
        xcoord: string;
        ycoord: string;
        floor: string;
        building: string;
        nodeType: string;
        longName: string;
        shortName: string;
      }[];

      const parsedJsonData = [];

      for (let i = 0; i < jsonData.length; i++) {
        parsedJsonData.push({
          nodeID: redefinedJsonData[i].nodeID,
          xcoord: parseInt(redefinedJsonData[i].xcoord),
          ycoord: parseInt(redefinedJsonData[i].ycoord),
          floor: redefinedJsonData[i].floor,
          building: redefinedJsonData[i].building,
          nodeType: redefinedJsonData[i].nodeType,
          longName: redefinedJsonData[i].longName,
          shortName: redefinedJsonData[i].shortName,
        });
      }

      console.log(parsedJsonData);
      const res = await axios.post(
        "/api/csvFetch/node",
        JSON.stringify(parsedJsonData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status == 200) {
        console.log("success");
      }
    } else if (selectedFile.name.includes("Edge")) {
      const redefinedJsonData = jsonData as {
        startNodeID: string;
        endNodeID: string;
      }[];

      const parsedJsonData = [];

      for (let i = 0; i < jsonData.length; i++) {
        parsedJsonData.push({
          startNodeID: redefinedJsonData[i].startNodeID,
          endNodeID: redefinedJsonData[i].endNodeID,
        });
      }

      const res = await axios.post("/api/csvFetch/edge", parsedJsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
        setJsonData(jsonData);
      }
    }
  }

  return (
    <>
      <Header />
      <div className="csv-container">
        <form id="csvForm" onSubmit={handleSubmit}>
          <input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <button className="upload-btn" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        <div className="button-group">
          <button className="export-btn" onClick={exportCSV}>
            Export CSV
          </button>
        </div>

        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        <div id="displayArea">
          <table className="table table-striped">
            <thead>
              <tr>
                {jsonData.length > 0 &&
                  Object.keys(jsonData[0]).map((header, index) => (
                    <th key={index}>{capitalizeTableColumn(header)}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CSVTable;
