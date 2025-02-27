export type PaginatedRes<T> = {
  total: number;
  skip: number;
  limit: number;
} & T;
