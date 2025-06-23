export interface PaginatedResponse<T> {
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  data: T[];
}
