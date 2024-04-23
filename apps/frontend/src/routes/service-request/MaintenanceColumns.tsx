"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { MaintenanceForm } from "@/interfaces/maintenanceReq.ts";
import { DataTableColumnHeaderEmployee } from "@/components/table/data-table-employee-header.tsx";
export const columnsMaintenanceLog: ColumnDef<MaintenanceForm>[] = [
  {
    accessorKey: "reqId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-normal">#{row.getValue("reqId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeaderEmployee column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "typeOfIssue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type Of Issue" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("typeOfIssue")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("location")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "severity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Severity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("severity")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
];
