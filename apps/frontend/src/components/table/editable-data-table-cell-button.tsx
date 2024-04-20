import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { Row, Table } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

// Define an interface for the table meta
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TableMeta<TData> {
  editedRows: Record<string, boolean>;
  updateData: (rowIndex: number, columnId: string, value: string) => void;
  setEditedRows: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>;
  revertData: (rowIndex: number, revert: boolean) => void;
  deleteRow: (rowIndex: number) => void;
}

interface EditableTableCellProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  row: Row<TData>;
}
export function EditCellActionButton<TData>({
  row,
  table,
}: EditableTableCellProps<TData>) {
  const meta = table?.options?.meta as TableMeta<TData>;

  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: Record<string, boolean>) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elName !== "edit") {
      if (elName === "cancel") {
        meta?.revertData(row.index, true);
      } else if (elName === "delete") {
        // Handle row deletion
        meta?.deleteRow(row.index);
      }
    }
  };
  return (
    <div className="edit-cell-container">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell ">
          <Button
            onClick={setEditedRows}
            className={"h-10 w-10"}
            variant={"destructive"}
            name="cancel"
          >
            <TrashIcon className={""} />
          </Button>
          <Button onClick={setEditedRows} name="done">
            ✔
          </Button>
        </div>
      ) : (
        <Button onClick={setEditedRows} name="edit">
          ✐
        </Button>
      )}
    </div>
  );
}
