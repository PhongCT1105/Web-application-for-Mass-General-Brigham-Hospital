"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { SecurityForm } from "common/src/interfaces/securityReq.ts";
// import { Button } from "@/components/ui/button.tsx";
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog.tsx";
import { priorities, statuses } from "common/src/dataTypes/labels.ts";
//import {SecurityFormLogTable} from "@/routes/request-log/securityLogPage.tsx";
export const columnsSecurityFormLog: ColumnDef<SecurityForm>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-normal">#{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("employee")}
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
    accessorKey: "call",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Call" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("call")}
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
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("description")}
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
            {row.getValue("dateSubmitted")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  // {
  //     id: "actions",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Details" />
  //     ),
  //     cell: ({ row }) => (
  //         <div className={"w-full"}>
  //             <Dialog>
  //                 <DialogTrigger asChild>
  //                     <Button
  //                         variant="ghost"
  //                         className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
  //                     >
  //                         <DotsHorizontalIcon className="h-4 w-4" />
  //                         <span className="sr-only">Open menu</span>
  //                     </Button>
  //                 </DialogTrigger>
  //                 <DialogContent className={"lg:max-w-screen-lg  max-h-screen"}>
  //                     <DialogHeader>
  //                         <DialogTitle className={"pb-3"}>
  //                             Security requested by {row.original.employee}
  //                         </DialogTitle>
  //                     </DialogHeader>
  //                 </DialogContent>
  //             </Dialog>
  //         </div>
  //     ),
  // },
];

// const securityLogColumns: ColumnDef<SecurityForm>[] = [
//     {
//         accessorKey: "id",
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="ID" />
//         ),
//         cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "employee",
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Employee" />
//         ),
//         cell: ({ row }) => {
//             return (
//                 <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium">
//             {row.getValue("employee")}
//           </span>
//                 </div>
//             );
//         },
//         enableHiding: false,
//     },
//     {
//         accessorKey: "status",
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Status" />
//         ),
//         cell: ({ row }) => {
//             const status = statuses.find(
//                 (status) => status.value === row.getValue("status"),
//             );
//
//             if (!status) {
//                 return null;
//             }
//
//             return (
//                 <div className="flex w-[100px] items-center">
//                     {status.icon && (
//                         <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//                     )}
//                     <span>{status.label}</span>
//                 </div>
//             );
//         },
//         filterFn: (row, id, value) => {
//             return value.includes(row.getValue(id));
//         },
//     },
//     {
//         accessorKey: "priority",
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Priority" />
//         ),
//         cell: ({ row }) => {
//             const priority = priorities.find(
//                 (priority) => priority.value === row.getValue("call"),
//             );
//
//             if (!priority) {
//                 return null;
//             }
//
//             return (
//                 <div className="flex items-center">
//                     {priority.icon && (
//                         <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//                     )}
//                     <span>{priority.label}</span>
//                 </div>
//             );
//         },
//         filterFn: (row, id, value) => {
//             return value.includes(row.getValue(id));
//         },
//     },
//
//     {
//         accessorKey: "dateSubmitted",
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Date Submitted" />
//         ),
//         cell: ({ row }) => {
//             return (
//                 <div className="flex space-x-2">
//           <span className="max-w-[100px] truncate font-medium">
//             {row.getValue("dateSubmitted")}
//           </span>
//                  </div>
//              );
//         },
//         enableHiding: false,
//     },
// ];
