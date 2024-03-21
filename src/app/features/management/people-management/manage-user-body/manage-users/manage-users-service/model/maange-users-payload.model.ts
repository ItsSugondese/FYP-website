import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface manageUserPagination extends paginationPayload{
    userType : string[];
    name ?: string | undefined;
    payStatus ?: string | null
}

export interface disableUser {
    remarks : string | null;
    userId: Number;
    isDisabled: boolean;
}