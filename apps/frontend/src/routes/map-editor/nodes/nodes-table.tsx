import * as React from "react";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/table/data-table-pagination.tsx";
import { Node } from "@/routes/map-editor/mapEditorTablePage.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useGraphContext } from "@/context/nodeContext.tsx";
import axios from "axios";
import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
// import {Input} from "@/components/ui/input.tsx";

interface DataTableProps {
  columns: ColumnDef<Node>[];
}

export function NodeDataTable({ columns }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { nodes: data, setNodes } = useGraphContext();
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});
  const [nodeToAdd, setNodeToAdd] = useState<{ node: Node; neighbor: string }>({
    node: {
      nodeID: "",
      xcoord: 0,
      ycoord: 0,
      floor: "",
      building: "",
      nodeType: "",
      longName: "",
      shortName: "",
    },
    neighbor: "",
  });

  const nodeKV: { [key: string]: keyof Node | string } = {
    nodeID: "nodeID",
    xcoord: "xcoord",
    ycoord: "ycoord",
    floor: "floor",
    building: "building",
    nodeType: "nodeType",
    longName: "longName",
    shortName: "shortName",
    neighbor: "neighbor",
  };

  const handleAddedNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeToAdd((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(nodeToAdd);
  };

  const handleSubmitForm = () => {
    console.log(JSON.stringify(nodeToAdd.node));
  };

  useEffect(() => {
    const handleUpdateNodes = async () => {
      const res = await axios.post("/api/csvFetch/node", data, {
        headers: {
          "content-type": "Application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
      } else {
        console.log(res.status);
      }
    };
    handleUpdateNodes().then(() =>
      console.log("Update nodes request sent to database."),
    );
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setNodes((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row,
            ),
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) =>
              index === rowIndex ? data[rowIndex] : row,
            ),
          );
        }
      },
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string | number,
      ) => {
        setNodes((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex items-center justify-between">
          {/* search bar */}
          <Input
            placeholder="Filter Items..."
            value={
              (table.getColumn("longName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("longName")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"h-8 mb-2 space-between items-center"}>
              <PlusIcon className={"mr-2 -ml-1 h-5 w-5"} />
              Add Node
            </Button>
          </DialogTrigger>
          <DialogContent
            className={"lg:w-[500px] h-[700px] overflow-y-scroll "}
          >
            <div className="flex flex-col space-y-4">
              {Object.keys(nodeKV).map((key) => (
                <div key={key} className={"space-y-1"}>
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    type={
                      key === "ycoord" || key === "xcoord" ? "number" : "text"
                    }
                    id={key}
                    placeholder={key}
                    onChange={handleAddedNodeChange}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className={"w-full"} onClick={handleSubmitForm}>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
