import { Edge } from "@/routes/map-editor/mapEditorTablePage.tsx";
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
