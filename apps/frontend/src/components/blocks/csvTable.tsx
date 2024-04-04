import React, { useState } from "react";
import "@/styles/CSVTable.css"; // Import CSS file for table styling
import { Header } from "@/components/blocks/header.tsx";
import axios from "axios";
import * as fs from "fs";
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
      const nodesCSV = fs.readFileSync(selectedFile.name, "utf8");
      console.log(nodesCSV);
      const nodesData: string[] = nodesCSV.trim().split("\n").slice(1);
      console.log(nodesData);
      const nodes = nodesData.map((nodesData) => {
        const [
          nodeID,
          xcoord,
          ycoord,
          floor,
          building,
          nodeType,
          longName,
          shortName,
        ] = nodesData.split(",");
        return {
          nodeID,
          xcoord: parseInt(xcoord),
          ycoord: parseInt(ycoord),
          floor,
          building,
          nodeType,
          longName,
          shortName,
        };
      });

      console.log(nodes);
      const res = await axios.post("/api/csvFetch/node", nodes, {
        headers: {
          "content-type": "Application/json",
        },
      });

      if (res.status == 200) {
        console.log("success");
      }
    } else if (selectedFile.name.includes("Edge")) {
      const edgesData: string[] = selectedFile.name
        .trim()
        .replace(/\r/g, "")
        .split("\n")
        .slice(1);
      const edges = edgesData.map((edge) => {
        const [startNodeID, endNodeID] = edge.split(",");
        return { startNodeID, endNodeID };
      });

      const res = await axios.post("/api/csvFetch/edge", edges, {
        headers: {
          "content-type": "Application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
        setJsonData(jsonData);
      }
    }

    try {
      // const filename = selectedFile.name.toLowerCase(); // Convert filename to lowercase for case-insensitive comparison
      const endpoint = "/api/csvFetch/node";
      const jsonData = await importCSV(selectedFile);
      console.log(selectedFile);
      setJsonData(jsonData);
      const res = await axios.post(endpoint, selectedFile, {
        headers: {
          "content-type": "Application/json",
        },
      });

      if (res.status == 200) {
        console.log("success");
      }
    } catch (error) {
      console.error("Error storing data:", error);
    } finally {
      setUploading(false);
    }
  }

  //         const edgesData: string[] = filename.trim().split("\n").slice(1);
  //
  //         console.log(edgesData + "THIS IS A TEST");
  //
  //         const edges = edgesData.map((edge) => { // PROBLEM LINE
  //             const [startNodeID, endNodeID] = edge.split(",");
  //             return { startNodeID, endNodeID };
  //
  //         });
  //
  //
  //
  //
  //
  //         importCSV(selectedFile)
  //             .then(() => {
  //                 setUploading(false);
  //             })
  //             .catch((error) => {
  //                 console.error("Error importing file:", error);
  //                 setUploading(false);
  //             });
  //     } else if (filename.includes('node')) {
  //         const nodesData: string[] = filename.trim().split("\n").slice(1);
  //         const nodes = nodesData.map((nodesData) => {
  //             const [
  //                 nodeID,
  //                 xcoord,
  //                 ycoord,
  //                 floor,
  //                 building,
  //                 nodeType,
  //                 longName,
  //                 shortName,
  //             ] = nodesData.split(",");
  //             return {
  //                 nodeID,
  //                 xcoord: parseInt(xcoord),
  //                 ycoord: parseInt(ycoord),
  //                 floor,
  //                 building,
  //                 nodeType,
  //                 longName,
  //                 shortName,
  //             };
  //         });
  //
  //         const res = await axios.post("/api/csvTable", nodes, {
  //             headers: {
  //                 "content-type": "Application/json",
  //             },
  //         });
  //
  //         if (res.status == 200) {
  //             console.log("success");
  //         }
  //
  //         importCSV(selectedFile)
  //             .then(() => {
  //                 setUploading(false);
  //             })
  //             .catch((error) => {
  //                 console.error("Error importing file:", error);
  //                 setUploading(false);
  //             });
  //
  //     } else {
  //         console.error("File name does not contain 'Edge' or 'Node'.");
  //     }
  //
  //   const res = await axios.post("/api/csvTable", selectedFile, {
  //       headers: {
  //           "content-type": "Application/json",
  //       },
  //   });
  //
  //   if (res.status == 200) {
  //       console.log("success");
  //   }
  //
  //   importCSV(selectedFile)
  //     .then(() => {
  //       setUploading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error importing file:", error);
  //       setUploading(false);
  //     });
  // }

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
