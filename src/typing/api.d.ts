export type ApiResCode =
  | "SUCCESS"
  | "UNAUTHORIZED"
  | "UNKOWN_ERROR"
  | "NOT_FOUND"
  | "EMAIL_ALREADY_EXISTS"
  | "EMAIL_NOT_VERIFIED"
  | "EXPIRED"
  | "WRONG_PASSWORD";

export type ApiResponse<TData = any> = {} & (
  | {
      succeed: false;
      code: ApiResCode;
      data?: TData | null;
    }
  | {
      succeed: true;
      data: TData;
      code?: ApiResCode;
    }
);

export type BasePaginationProps<
  TInclude = null,
  TWhere = unknown,
  TOrderBy = unknown
> = {
  page?: number;
  perPage?: number;
  include?: TInclude;
  where?: TWhere;
  orderBy?: TOrderBy;
};

export type ApiPagination = {
  page: number;
  perPage: number;
  results: number;
  count: number;
  totalPages: number;
};

export type PaginatedApiResponse<TData = any> = ApiResponse<TData> & {
  pagination?: ApiPagination;
};
