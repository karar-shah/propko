"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BaseTable } from "./table";
import { PaginatedApiResponse } from "@/typing/api";
import { PaginationProps } from "@/typing/pagination";

type DataTableProps = {
  columns: ColumnDef<any>[];
  onRowClick?: (row: any) => void;
  tableData?: PaginatedApiResponse<any> | null;
  pagination: PaginationProps;
};

export default function DataTable({
  columns,
  pagination,
  onRowClick,
  tableData,
}: DataTableProps) {
  return (
    <div>
      <BaseTable
        data={tableData?.data}
        columns={columns}
        pagination={pagination}
        onRowClick={onRowClick}
      />
    </div>
  );
}
