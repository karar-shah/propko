"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { BaseTable, DataTableColumnHeader } from "./basic/table";
import { PaginationProps } from "@/typing/pagination";
import { PaginatedApiResponse } from "@/typing/api";
import DataTable from "./basic";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";

const tableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "propertyType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className={cn("font-bold font-nunito text-slate-600")}>
            {row.original.propertyType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "holdType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hold Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {row.original.propertyDetails?.holdType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "saleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {row.original.propertyDetails?.saleType}
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
            {row.original.location?.city}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "propertyHighlights",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Highlights" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          {row.original.propertyHighlights
            .slice(0, 2)
            .map((highlight: { name: string }, index: number) => (
              <span
                key={index}
                className={cn(
                  "max-w-full font-medium font-nunito text-slate-600"
                )}
              >
                {highlight.name}
              </span>
            ))}
          <span className="ml-1 pb-1 text-lg">...</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span
            className={cn("max-w-full font-medium font-nunito text-slate-600")}
          >
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return (
        <div
          className={cn("max-w-full font-medium font-nunito text-slate-600")}
        >
          {date.getDate()}-{date.getMonth().toLocaleString()}-
          {date.getFullYear()}
        </div>
      );
    },
  },
];

export default function ListingTable() {
  const { data: session, status } = useSession();
  console.log("session", typeof session?.user.id);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [tableData, setTableData] =
    useState<PaginatedApiResponse<any> | null>();

  const loadData = async () => {
    setTableData(null);
    try {
      const res = await axios.get<PaginatedApiResponse<any>>(
        `/api/listing?userid=${session?.user.id}`
      );
      setTableData(res.data);
    } catch (error) {
      setTableData(null);
    }
  };

  // const pagination: PaginationProps = {
  //   onPageChange: setCurrentPage,
  //   currentPage: currentPage,
  //   perPage: perPage,
  //   setPerPage: setPerPage,
  //   totalPages: tableData?.pagination?.totalPages ?? 1,
  // };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BaseTable
        data={tableData && tableData?.data}
        columns={tableColumns}
        // pagination={pagination}
      />
      {/* <DataTable
        pagination={pagination}
        columns={tableColumns}
        tableData={tableData?.data}
        // onRowClick={(row) => {
        //   router.push(`/listing/${row.id}`);
        // }}
      /> */}
    </div>
  );
}
