import { Edge, Node } from "@/routes/map-editor/mapEditorTablePage.tsx";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { ColumnDef } from "@tanstack/react-table";
export const edgeColumns: ColumnDef<Edge>[] = [
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
];

export const nodeColumns: ColumnDef<Node>[] = [
  {
    accessorKey: "nodeID",
    id: "nodeID",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.nodeID;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">#{row.getValue("nodeID")}</div>
    ),
    meta: {
      type: "text",
    },
    enableHiding: false,
  },
  {
    accessorKey: "xcoord",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.xcoord;
    },
    id: "xcoord",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="x-coord" />
    ),
    meta: {
      type: "number",
    },
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">{row.getValue("xcoord")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "ycoord",
    id: "ycoord",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.ycoord;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="y-coord" />
    ),
    meta: {
      type: "number",
    },
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">{row.getValue("ycoord")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "floor",
    id: "floor",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.floor;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floor" />
    ),
    meta: {
      type: "text",
    },
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
    id: "building",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.building;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Building" />
    ),
    meta: {
      type: "text",
    },
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
    id: "nodeType",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.nodeType;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Node Type" />
    ),
    meta: {
      type: "text",
    },
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
    id: "longName",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.longName;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Long Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-normal">{row.getValue("longName")}</div>
    ),
    enableHiding: false,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "shortName",
    id: "shortName",
    accessorFn: (originalRow) => {
      return originalRow && originalRow.shortName;
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Name" />
    ),
    meta: {
      type: "text",
    },
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
];
