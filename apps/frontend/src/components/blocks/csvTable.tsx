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
import axios, { AxiosResponse, AxiosError } from "axios";

interface CSVData {
  [key: string]: string; // Assuming all values in CSV are strings, adjust as needed
}

interface TableColumn {
  title: string;
  dataIndex: string;
}

interface Edge {
  edgeID: string;
  startNodeID: string;
  endNodeID: string;
  // Other fields as needed
}

interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  // Add other fields as needed
}

const CSVTable: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [jsonData, setJsonData] = useState<CSVData[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(100); // Added back rowsPerPage state
  const [paginationButtonCount] = useState<number>(5);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentNodes = nodes.slice(indexOfFirstRow, indexOfLastRow);
  const currentEdges = edges.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodesRes: AxiosResponse<Node[]> =
          await axios.get("/api/csvFetch/node");
        const edgesRes: AxiosResponse<Edge[]> =
          await axios.get("/api/csvFetch/edge");
        setNodes(nodesRes.data);
        setEdges(edgesRes.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching data:", axiosError.message);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to fetch data only once

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

    if (selectedFile.name.toLowerCase().includes("node")) {
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
      const res = await axios.post("/api/csvFetch/node", parsedJsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200) {
        console.log("success");
      }
    } else if (selectedFile.name.toLowerCase().includes("edge")) {
      const redefinedJsonData = jsonData as {
        edgeID: string;
        startNode: string;
        endNode: string;
      }[];

      const parsedJsonData = [];

      for (let i = 0; i < jsonData.length; i++) {
        parsedJsonData.push({
          edgeID: redefinedJsonData[i].edgeID,
          startNode: redefinedJsonData[i].startNode,
          endNode: redefinedJsonData[i].endNode,
        });
      }

      //console.log(JSON.parse(JSON.stringify(parsedJsonData)));
      console.log(parsedJsonData);

      const res = await axios.post(
        "/api/csvFetch/edge",
        //JSON.parse(JSON.stringify(parsedJsonData)),
        parsedJsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status == 200) {
        console.log("success");
        setJsonData(jsonData);
      }
    }
  }

  const columns: TableColumn[] =
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
                    {currentNodes.map((node) => (
                      <div key={node.nodeID}>
                        <span>{node.nodeID}</span>
                        <span>{node.nodeType}</span>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="Edges">
                    {currentEdges.map((edge) => (
                      <div key={edge.edgeID}>
                        <span>{edge.edgeID}</span>
                        <span>{edge.startNodeID}</span>
                        <span>{edge.endNodeID}</span>
                      </div>
                    ))}
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
                      <Button type="submit">Upload</Button>{" "}
                      {/* Added type="submit" */}
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
                    {jsonData
                      .slice(indexOfFirstRow, indexOfLastRow)
                      .map((row, rowIndex) => (
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
