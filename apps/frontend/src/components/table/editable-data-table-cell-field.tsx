import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Column, Row, Table } from "@tanstack/react-table";

interface TableMeta {
  editedRows: Record<string, boolean>;
  updateData: (
    rowIndex: number,
    columnId: string,
    value: string | number,
  ) => void;
}

interface Option {
  value: string;
  label: string;
}

interface ColumnMeta {
  type: string;
  options?: Option[];
}

interface EditableTableCellProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  column: Column<TData, TValue>;
  row: Row<TData>;
  // getValue: (columnId: string) => string | number;
  getValue: string | number;
}

export function EditableTableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: EditableTableCellProps<TData, TValue>) {
  const initialValue = getValue;
  // table.options.meta.updateData;
  const columnMeta = column?.columnDef.meta as ColumnMeta;
  const tableMeta = table?.options?.meta as TableMeta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // const onBlur = () => {
  //   tableMeta?.updateData(row.index, column.id, value);
  // };
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      // <></>
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
}
