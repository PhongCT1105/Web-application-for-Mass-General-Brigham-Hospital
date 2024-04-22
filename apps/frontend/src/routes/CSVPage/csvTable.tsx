import React, { useEffect, useState } from "react";
// import {Table, TableBody, TableCell, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { parse, ParseResult } from "papaparse";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/components/table/data-table.tsx";
import {
  edgeColumns,
  nodeColumns,
  employeeColumns,
} from "@/routes/CSVPage/csvColumns.tsx";
import { Employee } from "@/interfaces/employeeInterface.ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

interface CSVData {
  [key: string]: string; // Assuming all values in CSV are strings, adjust as needed
}

interface TableColumn {
  title: string;
  dataIndex: string;
}

interface Edge {
  edgeID: string;
  startNode: string;
  endNode: string;
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
  // const [paginationButtonCount] = useState<number>(5);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

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

  const exportCSV = (dataToExport: string) => {
    let csvContent = "";
    //dataToExport is set depending on which dropdown option is chosen from ExportCSV button
    switch (dataToExport) {
      case "Employees": {
        csvContent = employees
          .map((row) => Object.values(row).join(","))
          .join("\n");
        break;
      }
      case "Nodes": {
        csvContent = nodes
          .map((row) => Object.values(row).join(","))
          .join("\n");
        break;
      }
      case "Edges": {
        csvContent = edges
          .map((row) => Object.values(row).join(","))
          .join("\n");
        break;
      }
      default: {
        csvContent = "";
        console.log(
          "csvTable.exportCSV() - Export content not properly assigned! Returning empty",
        );
      }
    }
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
  const currentEmployees = employees.slice(indexOfFirstRow, indexOfLastRow);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const employeesRes: AxiosResponse<Employee[]> =
          await axios.get("/api/employeeData");
        setNodes(nodesRes.data);
        setEdges(edgesRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching data:", axiosError.message);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [employees, nodes, edges]); // Empty dependency array to fetch data only once

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

  //hi

  async function handleSubmit(e: React.FormEvent) {
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
        setJsonData(jsonData);
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
    } else if (selectedFile.name.toLowerCase().includes("employee")) {
      const redefinedJsonData = jsonData as {
        id: string;
        fName: string;
        lName: string;
        title: string;
      }[];

      const parsedJsonData = [];

      for (let i = 0; i < jsonData.length; i++) {
        parsedJsonData.push({
          id: redefinedJsonData[i].id,
          fName: redefinedJsonData[i].fName,
          lName: redefinedJsonData[i].lName,
          title: redefinedJsonData[i].title,
        });
      }
      const res = await axios.post(
        "/api/employeeData",
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

      //console.log(JSON.parse(JSON.stringify(parsedJsonData)));
    }
    //console.log(parsedJsonData);
  }

  const columns: TableColumn[] =
    jsonData && jsonData.length > 0
      ? Object.keys(jsonData[0]).map((header) => ({
          title: capitalizeTableColumn(header),
          dataIndex: header,
        }))
      : [];

  const getType = (columns: TableColumn[]): string => {
    if (columns.length === 3) {
      return "Edge";
    }
    if (columns.length === 8) {
      return "Node";
    }
    return "";
  };

  const setData = () => {
    if (getType(columns) === "Edge") {
      // let edges: Edge[] = [];
      // jsonData.map((value) => value);
      return jsonData.map(
        (value): Edge => ({
          edgeID: value.edgeID,
          startNode: value.startNode,
          endNode: value.endNode,
        }),
      );
    } else if (getType(columns) === "Employee") {
      // let edges: Edge[] = [];
      // jsonData.map((value) => value);
      return jsonData.map(
        (value): Employee => ({
          id: parseInt(value.id),
          fName: value.fName,
          lName: value.lName,
          title: value.title,
        }),
      );
    } else {
      return jsonData.map(
        (value): Node => ({
          nodeID: value.nodeID,
          xcoord: parseInt(value.xcoord),
          ycoord: parseInt(value.ycoord),
          floor: value.floor,
          building: value.building,
          nodeType: value.nodeType,
          longName: value.longName,
          shortName: value.shortName,
        }),
      );
    }
  };

  const getTable = () => {
    const type = getType(columns);
    if (type === "Edge") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const edges: Edge[] = setData();
      return <DataTable columns={edgeColumns} data={edges} />;
    } else if (type === "Node") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const nodes: Node[] = setData();
      return <DataTable columns={nodeColumns} data={nodes} />;
    } else if (type === "Employee") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const employees: Employee[] = setData();
      return <DataTable columns={employeeColumns} data={employees} />;
    } else {
      return <h2>No valid input detected.</h2>;
    }
  };

  return (
    <div className={"scrollbar "}>
      <div className="hidden md:block p-5">
        <div className="">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-4 lg:col-span-5  overflow-x-auto">
                <Tabs defaultValue="Nodes">
                  <TabsList className={"mb-4"}>
                    <TabsTrigger value="Nodes">Nodes</TabsTrigger>
                    <TabsTrigger value="Edges">Edges</TabsTrigger>
                    <TabsTrigger value="Employees">Employees</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <Input type="file" onChange={handleFileUpload} />
                    </div>
                    <div className="flex space-x-4">
                      {/*<Button onClick={exportCSV()}>Export CSV</Button>*/}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>Export CSV</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
                          <DropdownMenuRadioItem
                            key={1}
                            value={"Nodes"}
                            onClick={() => exportCSV("Nodes")}
                          >
                            {"Export Nodes"}
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            key={2}
                            value={"Edges"}
                            onClick={() => exportCSV("Edges")}
                          >
                            {"Export Edges"}
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            key={2}
                            value={"Employees"}
                            onClick={() => exportCSV("Employees")}
                          >
                            {"Export Employees"}
                          </DropdownMenuRadioItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <form onSubmit={handleSubmit}>
                        <Button type="submit">Upload</Button>{" "}
                        {/* Added type="submit" */}
                      </form>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <h1>Imported File:</h1> <br></br>
                  <div className={"mb-5"}>{getTable()}</div>
                  <Separator className="my-4" />
                  <TabsContent value="Nodes">
                    <h1>Nodes Data:</h1> <br></br>
                    <DataTable
                      data={currentNodes}
                      columns={nodeColumns}
                    ></DataTable>
                    {/*{currentNodes.map((node) => (*/}
                    {/*  <div key={node.nodeID}>*/}
                    {/*    <span>{node.nodeID}</span>*/}
                    {/*    <span>{node.nodeType}</span>*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </TabsContent>
                  <TabsContent value="Edges">
                    <h1>Edge Data:</h1> <br></br>
                    <DataTable columns={edgeColumns} data={currentEdges} />
                    {}
                    {/*{currentEdges.map((edge) => (*/}
                    {/*  <div key={edge.edgeID}>*/}
                    {/*    <span>{edge.edgeID}</span>*/}
                    {/*    <span>{edge.startNodeID}</span>*/}
                    {/*    <span>{edge.endNodeID}</span>*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </TabsContent>
                  <TabsContent value="Employees">
                    <h1>Employee Data:</h1> <br></br>
                    <DataTable
                      columns={employeeColumns}
                      data={currentEmployees}
                    ></DataTable>
                  </TabsContent>
                </Tabs>
                {/*<Separator className="my-4" />*/}

                {/*<DataTable columns={() => getType(columns) === "Edge" ? edgeColumns : nodeColumns} data={setData}/>*/}
                {/*<Table>*/}
                {/*    <TableHeader>*/}
                {/*        <TableRow>*/}
                {/*            {columns.map((column) => (*/}
                {/*                <TableCell key={column.dataIndex}>*/}
                {/*                    {column.title}*/}
                {/*                </TableCell>*/}
                {/*            ))}*/}
                {/*        </TableRow>*/}
                {/*    </TableHeader>*/}
                {/*    <TableBody>*/}
                {/*        {jsonData*/}
                {/*            .slice(indexOfFirstRow, indexOfLastRow)*/}
                {/*            .map((row, rowIndex) => (*/}
                {/*                <TableRow key={rowIndex}>*/}
                {/*                    {columns.map((column) => (*/}
                {/*                        <TableCell key={column.dataIndex}>*/}
                {/*                            {row[column.dataIndex]}*/}
                {/*                        </TableCell>*/}
                {/*                    ))}*/}
                {/*                </TableRow>*/}
                {/*            ))}*/}
                {/*    </TableBody>*/}
                {/*</Table>*/}
                {/* Pagination */}
                {/*{jsonData.length > 0 && (*/}
                {/*    <div className="flex justify-center my-4">*/}
                {/*        {Array.from({ length: paginationButtonCount }).map(*/}
                {/*            (_, index) => {*/}
                {/*                const pageNumber = index + 1;*/}
                {/*                return (*/}
                {/*                    <Button*/}
                {/*                        key={index}*/}
                {/*                        onClick={() => paginate(pageNumber)}*/}
                {/*                    >*/}
                {/*                        {pageNumber}*/}
                {/*                    </Button>*/}
                {/*                );*/}
                {/*            },*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}
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
