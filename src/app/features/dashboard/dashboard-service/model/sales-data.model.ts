export interface SalesDataPayload{
    limit ?: number | null,
    fromDate ?: string | null,
    toDate ?: string | null,
    filterType ?: string | null,
    
}


export interface SalesData {
  totalSales: number;
  totalQuantity: number;
  salesData : number[],
  quantityData : number[];
  labels : string[];
//   soldFood: SoldFood[];
}

interface SoldFood {
    name: string;
    salesIncome: number;
    quantity: number;
  }
  
  