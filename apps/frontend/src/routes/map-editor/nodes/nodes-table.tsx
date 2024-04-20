import * as React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
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
// import { cn } from "@/lib/utils";
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
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
// import { Label } from "@/components/ui/label.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
// import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
// import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command.tsx";

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
  // const uniqueBuildingNames: [string, ...string[]] = Array.from(new Set(data.map(node => node.building))) as [string, ...string[]];
  // const uniqueFloorNames: [string, ...string[]] = Array.from(new Set(data.map(node => node.floor))) as [string, ...string[]];
  // const uniqueNodeIds: [string, ...string[]] = Array.from(new Set(data.map(node => node.nodeID))) as [string, ...string[]];
  //
  // const uniqueFloorNames: [string, ...string[]] = Array.from(new Set(data.map(node => node.floor)))
  //         .filter((building): building is string => true) as [string, ...string[]];
  //     const uniqueBuildingNames: [string, ...string[]] = Array.from(new Set(data.map(node => node.building)))
  //         .filter((building): building is string => true) as [string, ...string[]];
  // const uniqueNodeIds: [string, ...string[]] = Array.from(new Set(data.map(node => node.nodeID)))
  //         .filter((building): building is string => true) as [string, ...string[]];

  const formSchema = z.object({
    nodeID: z.string({ required_error: "Must enter a node ID." }),
    xcoord: z
      .number()
      .min(0, { message: "Invalid x-coord." })
      .max(5000, { message: "Invalid x-coord." }),
    ycoord: z
      .number()
      .min(0, { message: "Invalid y-coord." })
      .max(3400, { message: "Invalid y-coord." }),
    floor: z.string({ required_error: "Must enter a floor." }),
    building: z.string({ required_error: "Must enter a building." }),
    nodeType: z.string({ required_error: "Must enter a node type." }),
    longName: z.string({ required_error: "Must enter a long name." }),
    shortName: z.string({ required_error: "Must enter a short name." }),
    neighbor: z.string({ required_error: "Must enter a neighbor node." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nodeID: "",
      xcoord: 0,
      ycoord: 0,
      floor: "",
      building: "",
      nodeType: "",
      longName: "",
      shortName: "",
      neighbor: "",
    },
  });

  const handleSubmitForm = (values: z.infer<typeof formSchema>) => {
    // Create a new Node object from the values
    const newNode = {
      nodeID: values.nodeID,
      xcoord: Number(values.xcoord),
      ycoord: Number(values.ycoord),
      floor: values.floor,
      building: values.building,
      nodeType: values.nodeType,
      longName: values.longName,
      shortName: values.shortName,
    };

    console.log(newNode);
    // Add the new node to the nodes state
    setNodes((prevNodes) => [...prevNodes, newNode]);
    console.log("New node array length: " + data.length);
  };
  useEffect(() => {
    console.log("Data before filtering:", data);
    const filteredData = data.filter((node) => {
      if (node && node.nodeID != null && node.nodeID !== undefined) {
        return true;
      } else {
        console.log("Node with undefined or null nodeID found:", node);
        return false;
      }
    });
    console.log("Filtered data:", filteredData);

    // Check if filtered data has changed
    if (JSON.stringify(filteredData) !== JSON.stringify(data)) {
      // If changed, update state
      setNodes(filteredData);
      console.log("Update nodes request sent to database.");
    }

    console.log("Node array length: " + data.length);
  }, [data, setNodes]);

  useEffect(() => {
    console.log("Data before filtering:", data);
    const filteredData = data.filter((node) => {
      if (node && node.nodeID != null && node.nodeID !== undefined) {
        return true;
      } else {
        console.log("Node with undefined or null nodeID found:", node);
        return false;
      }
    });
    console.log("Filtered data:", filteredData);
    // setNodes(filteredData);
    console.log(data.length);
    const handleUpdateNodes = async () => {
      const res = await axios.post("/api/csvFetch/node", filteredData, {
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
    handleUpdateNodes().then(() => {
      // setNodes(filteredData);
      console.log("Update nodes request sent to database.");
    });
    console.log("Node array length: " + data.length);
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
      deleteRow: (rowIndex: number) => {
        setNodes((old) => old.filter((_, index) => index !== rowIndex));
        const filteredData = data.filter((node) => {
          if (node && node.nodeID != null && node.nodeID !== undefined)
            return true;
          else return false;
        });
        setNodes(filteredData);
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
          <DialogContent className={"w-[500px] h-[700px] overflow-y-scroll "}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitForm)}
                className={"space-y-4"}
              >
                {Object.keys(formSchema.shape).map((key) => (
                  <FormField
                    control={form.control}
                    key={key}
                    // eslint-disable-next-line
                    // @ts-ignore
                    name={key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={key}
                            type={
                              key === "xcoord" || key === "ycoord"
                                ? "number"
                                : "text"
                            }
                            {...field}
                            onChange={(e) => {
                              if (key === "xcoord" || key === "ycoord") {
                                field.onChange(Number(e.target.value));
                              } else {
                                field.onChange(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <DialogClose asChild>
                  <Button type={"submit"}>Submit</Button>
                </DialogClose>
              </form>
            </Form>
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
