export type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  perPage: number;
  setPerPage: (val: number) => void;
};
