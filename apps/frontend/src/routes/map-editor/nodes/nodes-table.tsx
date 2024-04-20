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
import { toast } from "@/components/ui/use-toast.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  // const [uniqueNodeIds, setUniqueNodeIds] = useState<string[]>([]);
  // const [uniqueFloor, setUniqueFloor] = useState<string[]>([]);
  // const [uniqueBuilding, setUniqueBuilding] = useState<string[]>([]);

  const nodeFormSchema = z.object({
    nodeID: z
      .string({ required_error: "Must enter a node ID." })
      .min(1, { message: "Required." }),
    xcoord: z
      .number()
      .min(0, { message: "Invalid x-coord." })
      .max(5000, { message: "Invalid x-coord." }),
    ycoord: z
      .number()
      .min(0, { message: "Invalid y-coord." })
      .max(3400, { message: "Invalid y-coord." }),
    floor: z
      .string({ required_error: "Must enter a floor." })
      .min(1, { message: "Required." }),
    building: z
      .string({ required_error: "Must enter a building." })
      .min(1, { message: "Required." }),
    nodeType: z
      .string({ required_error: "Must enter a node type." })
      .min(1, { message: "Required." }),
    longName: z
      .string({ required_error: "Must enter a long name." })
      .min(1, { message: "Required." }),
    shortName: z
      .string({ required_error: "Must enter a short name." })
      .min(1, { message: "Required." }),
  });

  const edgeFormSchema = z.object({
    startNodeID: z
      .string({ required_error: "Must enter a node ID." })
      .min(1, { message: "Required." }),
    endNodeID: z
      .string({ required_error: "Must enter a node ID." })
      .min(1, { message: "Required." }),
  });

  const edgeForm = useForm<z.infer<typeof edgeFormSchema>>({
    resolver: zodResolver(edgeFormSchema),
    defaultValues: {
      startNodeID: "",
      endNodeID: "",
    },
  });

  const nodeForm = useForm<z.infer<typeof nodeFormSchema>>({
    resolver: zodResolver(nodeFormSchema),
    defaultValues: {
      nodeID: "",
      xcoord: 0,
      ycoord: 0,
      floor: "",
      building: "",
      nodeType: "",
      longName: "",
      shortName: "",
    },
  });

  const onNodeFormSubmit = (values: z.infer<typeof nodeFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    setNodes((prevNodes) => [...prevNodes, values]);
    console.log("New node array length: " + data.length);
  };

  const onEdgeFormSubmit = async (values: z.infer<typeof edgeFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    const newEdge = {
      edgeID: values.endNodeID + "_" + values.startNodeID,
      startNodeID: values.startNodeID,
      endNodeID: values.endNodeID,
    };

    // ACONF00102
    // ACONF00103

    const res = await axios.post("/api/csvFetch/edge/add", newEdge, {
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

  useEffect(() => {
    if (data.length > 0) {
      // console.log("Data before filtering:", data);
      const filteredData = data.filter((node) => {
        if (node && node.nodeID != null && node.nodeID !== undefined) {
          return true;
        } else {
          console.log("Node with undefined or null nodeID found:", node);
          return false;
        }
      });
      // Check if filtered data has changed
      if (JSON.stringify(filteredData) !== JSON.stringify(data)) {
        // If changed, update state
        setNodes(filteredData);
      }

      console.log("Node array length: " + data.length);
    }
  }, [data, setNodes]);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter((node) => {
        if (node && node.nodeID != null && node.nodeID !== undefined) {
          return true;
        } else {
          console.log("Node with undefined or null nodeID found:", node);
          return false;
        }
      });
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
        console.log("Request was sent to database.");
        console.log("Node array length: " + data.length);
      });
    }
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
        setNodes((oldNodes) => {
          const newNodes = oldNodes.filter(
            (node, index) =>
              index !== rowIndex &&
              node.nodeID != null &&
              node.nodeID !== undefined,
          );
          return newNodes;
        });
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
          <DialogContent className={"w-[500px] h-[730px] overflow-y-scroll"}>
            <Form {...nodeForm}>
              <form
                onSubmit={nodeForm.handleSubmit(onNodeFormSubmit)}
                className={"space-y-2"}
              >
                {Object.keys(nodeFormSchema.shape).map((key) => (
                  <FormField
                    control={nodeForm.control}
                    key={key}
                    // eslint-disable-next-line
                    // @ts-ignore
                    name={key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FormLabel>
                        {["floor", "building", "nodeID"].includes(key) ? (
                          <Select
                            defaultValue={String(field.value)}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${key}`} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {key === "floor" &&
                                Array.from(
                                  new Set(data.map((node) => node.floor)),
                                ).map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              {key === "building" &&
                                Array.from(
                                  new Set(data.map((node) => node.building)),
                                ).map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              {key === "nodeID" &&
                                Array.from(
                                  new Set(data.map((node) => node.nodeID)),
                                ).map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        ) : (
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
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <DialogClose asChild></DialogClose>
                <Button type={"submit"} className={""}>
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"h-8 mb-2 space-between items-center"}>
              <PlusIcon className={"mr-2 -ml-1 h-5 w-5"} />
              Add Edge
            </Button>
          </DialogTrigger>
          <DialogContent className={"w-[500px] "}>
            <Form {...edgeForm}>
              <form
                onSubmit={edgeForm.handleSubmit(onEdgeFormSubmit)}
                className={"space-y-4"}
              >
                {Object.keys(edgeFormSchema.shape).map((key) => (
                  <FormField
                    control={edgeForm.control}
                    key={key}
                    // eslint-disable-next-line
                    // @ts-ignore
                    name={key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${key}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from(
                              new Set(data.map((node) => node.nodeID)),
                            ).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <DialogClose asChild></DialogClose>
                <Button type={"submit"}>Submit</Button>
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

{
  /*{ key === "floor" ||  key === "building" ||  key === "nodeID" ? (*/
}
{
  /*    <Select defaultValue={field.value.toString()} onValueChange={field.onChange}>*/
}
{
  /*        <FormControl>*/
}
{
  /*            <SelectTrigger>*/
}
{
  /*                <SelectValue placeholder="Select a value..." />*/
}
{
  /*            </SelectTrigger>*/
}
{
  /*        </FormControl>*/
}
{
  /*        <SelectContent>*/
}
{
  /*            {key === "floor" ?*/
}
{
  /*                uniqueFloor.map(value => (*/
}
{
  /*                    <SelectItem value={value}>{value}</SelectItem>))*/
}
{
  /*                : key === "building" ?*/
}
{
  /*                    uniqueBuilding.map(value => (*/
}
{
  /*                        <SelectItem value={value}>{value}</SelectItem>))*/
}
{
  /*                    : key === "nodeID" ? uniqueNodeIds.map(value => (*/
}
{
  /*                        <SelectItem value={value}>{value}</SelectItem>)) : (<></>)}*/
}
{
  /*        </SelectContent>*/
}
{
  /*    </Select>*/
}
