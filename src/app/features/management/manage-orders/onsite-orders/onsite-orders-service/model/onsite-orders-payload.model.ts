import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onsiteOrderPagination extends paginationPayload{
    timeRange ?: string;
    onsiteOrderFilter: string;
    name ?: string;
}

export interface OnsiteOrderOfUserPagination extends paginationPayload{
    payStatus ?: string;
    userId : number

}

