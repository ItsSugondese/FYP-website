import { orderedFood } from "../../../order.model";




export interface onlineOrder {
    order_code: string;
    full_name: string;
    user_id: number;
    approval_status: string;
    id: number;
    to_time: string;
    from_time: string;
    email: string;
    time_range : string,
    orderFoodDetails : orderedFood[]
}
