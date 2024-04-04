import React, { useState, useEffect } from "react";
import { Header } from "@/components/blocks/header.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { parse, ParseResult } from "papaparse";
import axios from "axios";

interface CSVData {
  [key: string]: string; // Assuming all values in CSV are strings, adjust as needed
}

const CSVTable: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [jsonData, setJsonData] = useState<CSVData[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100); // Added back rowsPerPage state
  const [paginationButtonCount, setPaginationButtonCount] = useState<number>(5);

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

  // Pagination logic
  const indexOfFirstRow = (currentPage - 1) * rowsPerPage;
  const indexOfLastRow = Math.min(
    indexOfFirstRow + rowsPerPage,
    jsonData.length,
  );
  const currentRows = jsonData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setRowsPerPage(100);
  };

  useEffect(() => {
    // Calculate the number of pages based on the updated finalVals length and rowsPerPage
    const pageCount = Math.ceil(jsonData.length / rowsPerPage);
    // Set paginationButtonCount based on the total number of pages
    setPaginationButtonCount(Math.min(5, pageCount)); // Default to 5 buttons

    // Adjust paginationButtonCount if there are more than 50 data points
    if (pageCount > 10) {
      setPaginationButtonCount(Math.min(10, pageCount)); // Set a maximum of 10 buttons
    }
  }, [jsonData, rowsPerPage]);

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

  const columns =
    jsonData && jsonData.length > 0
      ? Object.keys(jsonData[0]).map((header) => ({
          title: capitalizeTableColumn(header),
          dataIndex: header,
        }))
      : [];

  return (
    <div className={"scrollbar"}>
      <Header />
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-4 lg:col-span-5 lg:border-l overflow-x-auto">
                <Tabs defaultValue="Nodes">
                  <TabsList>
                    <TabsTrigger value="Nodes">Nodes</TabsTrigger>
                    <TabsTrigger value="Edges">Edges</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Nodes">
                    {/* Place node-related content here */}
                  </TabsContent>
                  <TabsContent value="Edges">
                    {/* Place edge-related content here */}
                  </TabsContent>
                </Tabs>
                <Separator className="my-4" />
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <input type="file" onChange={handleFileUpload} />
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={exportCSV}>Export CSV</Button>
                    <form onSubmit={handleSubmit}>
                      <Button>Upload</Button>
                    </form>
                  </div>
                </div>
                <Separator className="my-4" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.dataIndex}>
                          {column.title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentRows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column) => (
                          <TableCell key={column.dataIndex}>
                            {row[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Pagination */}
                {jsonData.length > 0 && (
                  <div className="flex justify-center my-4">
                    {Array.from({ length: paginationButtonCount }).map(
                      (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <Button
                            key={index}
                            onClick={() => paginate(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {uploading && <div>Loading...</div>}
          {uploadStatus && <div>{uploadStatus}</div>}
        </div>
      </div>
    </div>
  );
};

export default CSVTable;
