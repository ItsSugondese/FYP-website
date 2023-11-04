export interface onlineOrderPayload{
    id ?: number,
    foodOrderList : foodOrderPayload[],
    removeFoodId ?: number[],
    arrivalTime : string
}

export interface foodOrderPayload{
    id ?:number,
    foodId : number,
    quantity : number
}