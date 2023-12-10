import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onlineOrderPagination extends paginationPayload{
    fromTime : string,
    toTime : string
}