import { orderedFood } from "src/app/features/management/manage-orders/order.model";
import { foodMenu } from "src/app/shared/model/food/food.model";

export interface UserOrderHistory {
    id: number;
    orderType: string;
    orderFoodDetails : orderedFood[]
    date: string;
    arrivalTime: string;
    profileUrl: string;
    foodMenu: foodMenu[]
}