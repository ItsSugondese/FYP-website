import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface manageUserPagination extends paginationPayload{

}

export interface disableUser {
    remarks : string | null;
    userId: Number;
    isDisabled: boolean;
}