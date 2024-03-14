import { paginationPayload } from "@shared/model/pagination/pagination.model";

export interface UserFinanceData {
    sno: number;
    totalTransaction: number;
    totalPaid: number;
    dueAmount: number;
    userId: number;
    fullName: string;
}
export interface UserFinancePaginationPayload extends paginationPayload{
    fromDate : string,
    toDate : string,
    name ?: string
}
