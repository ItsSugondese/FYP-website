import { orderedFood } from "../../../order.model";

export interface onsiteOrder {
    id: number;
    fullName: string;
    user_id: number;
    orderType : string,
    email: string;
    orderedTime : string
    orderFoodDetails : orderedFood[]
}

