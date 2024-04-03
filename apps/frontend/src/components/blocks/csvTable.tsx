import React, { useState } from "react";
import "@/styles/CSVTable.css"; // Import CSS file for table styling
import { Header } from "@/components/blocks/header.tsx";

const CSVTable: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [finalVals, setFinalVals] = useState<string[][]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>(""); // Upload status message

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      importCSV(file)
        .then(() => {
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

  const capitalizeTableColumn = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const exportCSV = () => {
    const csvContent = finalVals.map((row) => row.join(",")).join("\n");
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

  const importCSV = (file: File): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const csvReader = new FileReader();
      csvReader.onload = (evt) => {
        const text = evt.target?.result;
        if (text && typeof text === "string") {
          const values = text.split(/\n+/);
          const parsedValues = values.map((val) => val.split(","));
          setFinalVals(parsedValues); // Set the imported CSV data to finalVals state
          resolve();
        } else {
          reject(new Error("Failed to read file content."));
        }
      };
      csvReader.readAsText(file);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    setUploading(true);
    importCSV(selectedFile)
      .then(() => {
        setUploading(false);
      })
      .catch((error) => {
        console.error("Error importing file:", error);
        setUploading(false);
      });
  };

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
                {finalVals.length > 0 &&
                  finalVals[0].map((header, index) => (
                    <th key={index}>{capitalizeTableColumn(header)}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {finalVals.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
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
