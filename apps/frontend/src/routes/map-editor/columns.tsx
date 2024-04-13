"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { priorities, statuses } from "common/src/dataTypes/labels.ts";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
// import { DataTableRowActions } from "@/components/table/data-table-row-actions.tsx";
// import {
//     TooltipProvider,
//     Tooltip,
//     TooltipTrigger,
//     TooltipContent,
// } from "@/components/ui/tooltip.tsx";

import { Edge, Node } from "./mapEditorPage";
export const nodeColumns: ColumnDef<Node>[] = [
  // {
  //     id: "select",
  //     header: ({ table }) => (
  //         <Checkbox
  //             checked={
  //                 table.getIsAllPageRowsSelected() ||
  //                 (table.getIsSomePageRowsSelected() && "indeterminate")
  //             }
  //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //             aria-label="Select all"
  //             className="translate-y-[2px]"
  //         />
  //     ),
  //     cell: ({ row }) => (
  //         <Checkbox
  //             checked={row.getIsSelected()}
  //             onCheckedChange={(value) => row.toggleSelected(!!value)}
  //             aria-label="Select row"
  //             className="translate-y-[2px]"
  //         />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  // },
  {
    accessorKey: "nodeID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">#{row.getValue("nodeID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "xcoord",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="x-cord" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("xcoord")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "ycoord",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="y-cood" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("ycoord")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "floor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("floor")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "building",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Building" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("building")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "nodeType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Node Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("nodeType")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "longName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Long Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("longName")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "shortName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("shortName")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  // {
  //     id: "actions",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Actions" />
  //     ),
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

export const edgeColumns: ColumnDef<Edge>[] = [
  // {
  //     id: "select",
  //     header: ({ table }) => (
  //         <Checkbox
  //             checked={
  //                 table.getIsAllPageRowsSelected() ||
  //                 (table.getIsSomePageRowsSelected() && "indeterminate")
  //             }
  //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //             aria-label="Select all"
  //             className="translate-y-[2px]"
  //         />
  //     ),
  //     cell: ({ row }) => (
  //         <Checkbox
  //             checked={row.getIsSelected()}
  //             onCheckedChange={(value) => row.toggleSelected(!!value)}
  //             aria-label="Select row"
  //             className="translate-y-[2px]"
  //         />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  // },
  {
    accessorKey: "edgeID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">#{row.getValue("edgeID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "startNode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Node" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("startNode")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "endNode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Node" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("endNode")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },

  // {
  //     id: "actions",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Actions" />
  //     ),
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
