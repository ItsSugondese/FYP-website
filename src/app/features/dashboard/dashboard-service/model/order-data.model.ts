export interface OrderDataPayload{
    timeDifference : number,
}

export interface OrderData {
    totalOrder: number;
    totalPending: number;
    onsiteOrder: OnsiteOrder;
    onlineOrder: OnlineOrder
}


interface OnsiteOrder {
    total: number;
    delivered: number;
    pending: number;
    canceled: number;
  }
  
  interface OnlineOrder {
    total: number;
    approved: number;
    pending: number;
  }
  