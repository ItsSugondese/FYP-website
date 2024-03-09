export interface RevenueDataPayload {
    fromDate?: string,
    toDate?: string
  }

export interface RevenueData {
    revenue: number;
    paidAmount: number;
    leftToPay: number;
  }
  