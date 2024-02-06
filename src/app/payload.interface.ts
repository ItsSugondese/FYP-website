export interface onlineOrderPayload{
    id : number | null,
    foodOrderList : foodOrderPayload[],
    removeFoodId ?: number[],
    arrivalTime : string
}

export interface foodOrderPayload{
    id : number | null,
    foodId : number,
    quantity : number
}