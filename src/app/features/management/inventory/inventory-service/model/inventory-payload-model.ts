import { foodMenu } from "@shared/model/food/food.model";
import { defaultPaginationNavigator, paginationPayload } from "@shared/model/pagination/pagination.model";

export interface InventoryPaginationPayload extends paginationPayload {

}

export interface InventoryPayload{
    id ?: number,
    stock: number,
    foodId ?: number
}

export interface InventoryLogPayload extends paginationPayload{
    foodId ?: number
}

export interface Inventory extends foodMenu{
    remainingQuantity: number,
}

export interface InventoryMenuLog {
    id: number;
    stock: number;
    date: string;
    remainingQuantity: number;
}
