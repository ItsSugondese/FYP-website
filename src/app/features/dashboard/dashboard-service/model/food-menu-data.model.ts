export interface FoodMenuData {
    total : number,
    latest : number,
    today: number,
    notToday: number
  }

  export interface FoodMenuDataPayload{
    fromDate ?: string ,
    toDate ?: string , 
}