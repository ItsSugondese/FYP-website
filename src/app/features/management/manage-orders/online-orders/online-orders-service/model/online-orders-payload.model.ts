import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onlineOrderPagination extends paginationPayload{
    minDifference: number;
    name ?: string
}