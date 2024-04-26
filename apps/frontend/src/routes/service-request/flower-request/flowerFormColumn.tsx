import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { FlowerForm, Flowers } from "@/interfaces/flowerReq";
import { format } from "date-fns";
import React from "react";
import { DataTable } from "@/components/table/data-table.tsx";
export const columnsFlowerFormLog: ColumnDef<FlowerForm>[] = [
  {
    accessorKey: "reqID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-normal">{"F" + row.getValue("reqID")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("recipient")}
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
    accessorKey: "dateSubmitted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Submitted" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[200px] truncate font-medium">
            {format(row.getValue("dateSubmitted"), "MMMM do, yyyy")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Cost" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("total")}
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
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => (
      <div className={"w-full"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className={"lg:max-w-screen-lg  max-h-screen"}>
            <DialogHeader>
              <DialogTitle className={"pb-3"}>
                Gift was requested by {row.original.sender}
              </DialogTitle>
            </DialogHeader>
            <DataTable
              columns={flowerLogColumns}
              data={!!row.original.cartItems && row.original.cartItems}
            />
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

const flowerLogColumns: ColumnDef<Flowers>[] = [
  {
    accessorKey: "fID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("fID")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("cost")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
];
