"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Medication, MedicationForm } from "@/interfaces/medicationReq.ts";
import { DataTableToolbar } from "@/components/table/data-table-toolbar.tsx";
import { DataTablePagination } from "@/components/table/data-table-pagination.tsx";
import { useMedicineData } from "@/routes/service-request/ServiceRequestPage.tsx";
import axios from "axios";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
interface DataTableProps {
  columns: ColumnDef<Medication>[];
}

export function MedicineRequest({ columns }: DataTableProps) {
  const now = new Date();

  const [employees, setEmployees] = React.useState<string[]>([]);
  const [submission, setSubmission] = React.useState<Medication[]>([]);
  const [form, setForm] = React.useState<MedicationForm>({} as MedicationForm);

  const handleAddRow = (item: Medication) => {
    setSubmission((prev) => [
      ...prev,
      {
        id: item.id,
        status: item.status,
        name: item.name,
        priority: item.priority,
        quantity: item.quantity,
        price: item.price,
      },
    ]);
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      medication: submission,
      dateSubmitted: now.toDateString(),
      [event.target.id]: event.target.value,
    }));
  };
  const { data } = useMedicineData();

  const handleSubmit = async () => {
    console.log(form);
    const res = await axios.post("/api/medicationReq", form, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log("success");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employeeData");
        const rawData = response.data;

        const extractedEmployees = rawData.map(
          (item: { id: number; fName: string; lName: string; title: string }) =>
            item.lName,
        );

        setEmployees(extractedEmployees);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data on component mount
    fetchEmployees();
  }, []);

  const handleEmployeeChange = (selectedEmployee: string) => {
    setForm((prevState) => ({
      ...prevState,
      employee: selectedEmployee,
    }));
  };

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
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
    <div className="space-y-4">
      <DataTableToolbar table={table} />
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

      <Dialog>
        <DialogTrigger asChild className={"w-full"}>
          <Button
            className={"w-full "}
            onClick={() => {
              {
                table.getRowModel().rows?.length
                  ? table.getRowModel().rows.map((row, index) => {
                      if (row.getIsSelected() && "selected") {
                        handleAddRow(row.original);
                        console.log(row.original, index);
                        table.getState().rowSelection; //read the row selection state
                        table.setRowSelection((old) => ({ ...old })); //set the row selection state
                        table.resetRowSelection(); //reset the row selection state
                      }
                    })
                  : console.log("null");
              }
            }}
          >
            Submit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Label>Employee Name</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                {form.employee ? form.employee : "Select Your Name"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
              {employees.map((employee, index) => (
                <DropdownMenuRadioItem
                  key={index}
                  value={employee}
                  onClick={() => handleEmployeeChange(employee)}
                >
                  {employee}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Label>Patient Location</Label>
          <Input
            type={"text"}
            id={"location"}
            placeholder={"Location"}
            onChange={handleFormChange}
          />
          <Label>Patient Name</Label>
          <Input
            type={"text"}
            id={"patient"}
            placeholder={"Patient name"}
            onChange={handleFormChange}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button className={"w-full"} onClick={handleSubmit}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
