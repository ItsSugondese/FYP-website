import { orderedFood } from "../../../order.model";




export interface onlineOrder {
    orderCode: number;
    fullName: string;
    userId: number;
    arrivalTime: string;
    id: number;
    to_time: string;
    from_time: string;
    email: string;
    time_range : string,
    orderFoodDetails : orderedFood[];
    profileUrl : string;
    totalPrice: number
}

export interface SummaryData {
    id: number;
    quantity: number;
    foodName: string;
    photoId: number
}
