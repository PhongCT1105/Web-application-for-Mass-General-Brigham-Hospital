"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { priorities, statuses } from "common/src/dataTypes/labels.ts";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { DataTableRowActions } from "@/components/table/data-table-row-actions.tsx";
import { Medication } from "common/src/interfaces/medicationReq.ts";
import { Input } from "@/components/ui/input.tsx";
import { useMedicineData } from "@/routes/service-request/ServiceRequestPage.tsx";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip.tsx";
export const columns: ColumnDef<Medication>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cost);

      return (
        <div className="flex space-x-2">
          {/*{cost && <Badge variant="outline">{cost}</Badge>}*/}
          <span className="max-w-[500px] truncate font-medium">
            {formatted}
          </span>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, setData } = useMedicineData();
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px]  font-medium">
            <Input
              type={"number"}
              className={"focus-visible:outline-none"}
              onChange={(event) => {
                const newData = data.map((item: Medication, index: number) => {
                  if (index === row.index) {
                    return { ...item, quantity: parseInt(event.target.value) }; // Update the specified property
                  }
                  return item;
                });
                setData(newData);
              }}
            ></Input>
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
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {status.icon && (
                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
              </TooltipTrigger>
              {status.label}
              <TooltipContent>
                <p>Click on "..." action buttons to adjust this value. </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {priority.icon && (
                  <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
              </TooltipTrigger>
              <span>{priority.label}</span>
              <TooltipContent>
                <p>Click on "..." action buttons to adjust this value. </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

// "use client";
//
// import { ColumnDef } from "@tanstack/react-table";
// import { priorities, statuses } from "common/src/dataTypes/labels.ts";
// import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
// import { DataTableRowActions } from "@/components/table/data-table-row-actions.tsx";
// import { Medication } from "common/src/interfaces/medicationReq.ts";
//
// export const columns: ColumnDef<Medication>[] = [
//   {
//     accessorKey: "id",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="ID" />
//     ),
//     cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "title",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Name" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium">
//             {row.getValue("Name")}
//           </span>
//         </div>
//       );
//     },
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Status" />
//     ),
//     cell: ({ row }) => {
//       const status = statuses.find(
//         (status) => status.value === row.getValue("status"),
//       );
//
//       if (!status) {
//         return null;
//       }
//
//       return (
//         <div className="flex w-[100px] items-center">
//           {status.icon && (
//             <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{status.label}</span>
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Priority" />
//     ),
//     cell: ({ row }) => {
//       const priority = priorities.find(
//         (priority) => priority.value === row.getValue("priority"),
//       );
//
//       if (!priority) {
//         return null;
//       }
//
//       return (
//         <div className="flex items-center">
//           {priority.icon && (
//             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{priority.label}</span>
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <DataTableRowActions row={row} />,
//   },
// ];
