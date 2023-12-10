import { foodMenu } from "../food/food.model";

export interface foodOrdering {
    id ?: number,
    quantity : number,
    imageSrc : string,
    selectedFoodMenu : foodMenu
}