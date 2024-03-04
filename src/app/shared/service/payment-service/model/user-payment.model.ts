export interface PaymentHistoryOfOrder {
    paidDate : string | null;
    remainingAmount: number;
    paidAmount: number;
    dueAmount: number;
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
export interface RemainingPaymentPayload {
    paidAmount: number;
    userId: number;
  }
  