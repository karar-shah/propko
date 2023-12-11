"use client";
import * as React from "react";
import { ColumnFiltersState, Table as TTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableViewOptions } from "./table";
import { TableActionProps } from "@/typing/table";
import Link from "next/link";

export interface ToolbarProps<TData> {
  toolbarActions?: TableActionProps;
}
interface DataTableToolbarProps<TData> extends ToolbarProps<TData> {
  table: TTable<TData>;
  filterValue: ColumnFiltersState;
  setFilterValue: (value: ColumnFiltersState) => void;
}

export type TableActionPopupState = {
  state: boolean;
  type: "ARCHIVE" | "RESTORE" | "DELETE";
};

export function DataTableToolbar<TData>({
  table,
  filterValue,
  setFilterValue,
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search property type"
          value={
            (table.getColumn("propertyType")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("propertyType")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <DataTableViewOptions table={table} />
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 flex"
          asChild
        >
          <Link href={"/listing"}>Add New</Link>
        </Button>
      </div>
    </div>
  );
}
