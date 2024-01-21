import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface disableUser {
    remarks : string | null;
    userId: Number;
    isDisabled: boolean;
}

export interface disableUserHistoryPagination extends paginationPayload{
    userId: Number
}
