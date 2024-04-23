import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
import { DataTableColumnHeaderEmployee } from "@/components/table/data-table-employee-header.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CircleEllipsis } from "lucide-react";
import { format } from "date-fns";

export const TransportRequestColumns: ColumnDef<ScheduleForm>[] = [
  {
    accessorKey: "reqID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[25px] font-normal">#{row.getValue("reqID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <DataTableColumnHeaderEmployee column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("employeeName")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("patientName")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "locationFrom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location From" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("locationFrom")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "locationTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location To" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("locationTo")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {format(row.getValue("date"), "MMMM do, yyyy")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("time")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("priority")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("status")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    id: "detail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => (
      <div className={"w-full"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className={"mr-3 hover:bg-transparent"}>
              <CircleEllipsis></CircleEllipsis>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Request Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div>
                <h1 className="text-2xl font-bold">Employee Name:</h1>
                <h2>{row.original.employeeName}</h2>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Patient Name:</h1>
                <h2>{row.original.patientName}</h2>
              </div>
              <div className="flex">
                <div className="w-1/4">
                  <h1 className="text-2xl font-bold">Priority Level:</h1>
                  <h2>{row.original.priority}</h2>
                </div>
                <div className="w-1/3 mr-2">
                  <h1 className="text-2xl font-bold">Location:</h1>
                  <div className="grid gap-2">
                    <h2 className="text-m">From:</h2>
                    <h2>{row.original.locationFrom}</h2>
                    <h2 className="text-m">To:</h2>
                    <h2>{row.original.locationTo}</h2>
                  </div>
                </div>
                <div className="w-1/6">
                  <h1 className="text-2xl font-bold">Time:</h1>
                  <h2>{row.original.time}</h2>
                  <h1 className="mt-3 text-2xl font-bold">Date:</h1>
                  <h2>{format(row.original.date, "MMMM do, yyyy")}</h2>
                </div>
                <div className="w-1/4 ml-12">
                  <h1 className="text-2xl font-bold">Status:</h1>
                  <h2>{row.original.status}</h2>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Reason:</h1>
                <h2>{row.original.reason}</h2>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Note:</h1>
                <h2>{row.original.note}</h2>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];
