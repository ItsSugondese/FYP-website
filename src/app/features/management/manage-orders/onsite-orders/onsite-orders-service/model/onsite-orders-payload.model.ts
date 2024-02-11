import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface onsiteOrderPagination extends paginationPayload{
    timeRange ?: string
}

export interface PaymentPayload {
    totalAmount: number
    paidAmount: number;
    discount?: number;
    dueAmount: number;
    remarks?: string;
    paymentMode?: string;
    onsiteOrderId: number;
    userId: number;
  }
  