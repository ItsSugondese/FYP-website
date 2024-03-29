import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onsiteOrderPagination extends paginationPayload{
    minuteRange : number;
    onsiteOrderFilter: string;
    name ?: string;
}

export interface OrderHistoryPagination extends paginationPayload{
    fromDate ?: string;
    toDate ?: string;
    name ?: string;
    payStatus ?: string
}

export interface OnsiteOrderOfUserPagination extends paginationPayload{
    payStatus ?: string;
    userId : number
}

