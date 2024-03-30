import { foodMenu } from "@shared/model/food/food.model";
import { paginationPayload } from "@shared/model/pagination/pagination.model";

export interface InventoryPaginationPayload extends paginationPayload {

}

export interface Inventory extends foodMenu{
    remainingQuantity: number
}