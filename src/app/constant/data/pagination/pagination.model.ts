export interface PaginatedData<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    currentPageIndex: number;
  }