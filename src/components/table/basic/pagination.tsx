import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationProps } from "@/typing/pagination";

interface DataTablePaginationProps<TData> extends PaginationProps {
  table: Table<TData>;
}
export const perPageCountOptions = [10, 20, 30, 40, 50, 100, 200] as const;
export function DataTablePagination<TData>({
  table,
  totalPages,
  onPageChange,
  currentPage,
  perPage,
  setPerPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between space-x-6 p-4">
      <div className="flex  items-center space-x-2 col-span-6 gap-10">
        <p className="text-sm font-medium text-slate-600">Rows per page</p>
        <Select
          value={`${perPage}`}
          onValueChange={(value) => {
            setPerPage(Number(value));
          }}
        >
          <SelectTrigger value={String(perPage)} className="h-8 w-[70px] ">
            <SelectValue placeholder={perPage} />
          </SelectTrigger>
          <SelectContent side="top">
            {perPageCountOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-10 xl:gap-0">
        {totalPages > 0 && (
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </div>
        )}
        <div className="flex items-center space-x-2 x">
          <Button
            variant="outline"
            className=" h-8 w-8 p-0 flex"
            onClick={() => onPageChange(0)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              onPageChange(
                currentPage < totalPages ? currentPage + 1 : currentPage
              )
            }
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className=" h-8 w-8 p-0 flex"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
