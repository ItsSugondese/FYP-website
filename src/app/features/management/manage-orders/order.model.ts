import { foodMenu } from "../manage-food-body/manage-foods/manage-foods-service/model/food-menu.model";


export interface orderedFood {
    id: number;
  quantity: number;
  foodName: string;
  cost: number;
  totalPrice: number;
  photoId: number;
  foodMenu: foodMenu
}