export interface onlineOrderPayload{
    id : number | null,
    foodOrderList : foodOrderPayload[],
    removeFoodId ?: number[],
    arrivalTime : string,
    totalPrice : number
}

export interface foodOrderPayload{
    id : number | null,
    foodId : number,
    quantity : number
}