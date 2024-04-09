"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { priorities, statuses } from "common/src/dataTypes/labels.ts";
import { Medication } from "common/src/interfaces/medicationReq.ts";
import { _Medication } from "common/src/interfaces/medicationReq.ts";
import { useMedicineData } from "@/routes/service-request/ServiceRequestPage.tsx";
// import {.'' medication} from "../data/schema.ts";
// import {useMedicineData} from "@/App.tsx";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = _Medication.parse(row.original);
  // let pills = useContext(PillContext);
  const { data, setData } = useMedicineData();

  const handlePropertyChange = (property: string, newValue: string) => {
    const newData = data.map((item: Medication, index: number) => {
      if (index === row.index) {
        return { ...item, [property]: newValue }; // Update the specified property
      }
      return item;
    });
    setData(newData);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.priority}>
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  onClick={() =>
                    handlePropertyChange("priority", priority.value)
                  }
                >
                  {priority.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.status}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  id={status.value}
                  value={status.value}
                  onClick={() => handlePropertyChange("status", status.value)}
                >
                  {status.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setData(
              data.filter((_val: Medication, i: number) => i !== row.index),
            );
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
