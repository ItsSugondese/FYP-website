import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onsiteOrderPagination extends paginationPayload{
    timeRange : string
}