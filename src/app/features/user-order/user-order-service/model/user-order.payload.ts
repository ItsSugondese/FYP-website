import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface UserOrderHistoryPagination extends paginationPayload{
    fromDate ?: string;
    toDate ?:  string
  }