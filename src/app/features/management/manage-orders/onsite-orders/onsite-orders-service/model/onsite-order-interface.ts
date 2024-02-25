import { orderedFood } from "../../../order.model";

export interface onsiteOrder {
    id: number;
    fullName: string;
    userId: number;
    orderType : string;
    email: string;
    orderedTime : string;
    totalPrice: number;
    remainingAmount: number;
    profileUrl: string;
    orderFoodDetails : orderedFood[];
    markAsRead: boolean
}

