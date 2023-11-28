"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "./basic/table";
import { PaginationProps } from "@/typing/pagination";
import { PaginatedApiResponse } from "@/typing/api";
import DataTable from "./basic";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";

const tableColumns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className={cn("font-bold font-nunito text-slate-600")}>
            {row.original.provider}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {row.original.address}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {row.original.city}
          </span>
        </div>
      );
    },
  },
  {
    id: "updated",
    accessorFn: (row) => format(new Date(row.updatedAt), "PPP"),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {format(new Date(row.original.updatedAt), "PP")}
          </span>
        </div>
      );
    },
  },
];

export default function ListingTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [tableData, setTableData] =
    useState<PaginatedApiResponse<any> | null>();

  const loadData = async () => {
    setTableData(null);
    try {
      const res = await axios.get<PaginatedApiResponse<any>>("/api/listing");
      setTableData(res.data);
    } catch (error) {
      setTableData(null);
    }
  };

  const pagination: PaginationProps = {
    onPageChange: setCurrentPage,
    currentPage: currentPage,
    perPage: perPage,
    setPerPage: setPerPage,
    totalPages: tableData?.pagination?.totalPages ?? 1,
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DataTable
        pagination={pagination}
        columns={tableColumns}
        tableData={tableData?.data}
        onRowClick={(row) => {
          router.push(`/listing/${row.id}`);
        }}
      />
    </div>
  );
}
