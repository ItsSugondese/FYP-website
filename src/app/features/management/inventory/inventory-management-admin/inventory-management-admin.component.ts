import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { InventoryService } from '../inventory-service/inventory.service';
import { Subscription } from 'rxjs';
import { Inventory, InventoryPaginationPayload } from '../inventory-service/model/inventory-payload-model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageFoodsService } from '../../manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { foodMenu } from '@shared/model/food/food.model';

@Component({
  selector: 'app-inventory-management-admin',
  templateUrl: './inventory-management-admin.component.html',
  styleUrls: ['./inventory-management-admin.component.scss']
})
export class InventoryManagementAdminComponent extends CommonVariable implements OnInit, OnDestroy {
  inventorySubscription$ !: Subscription
  getFoodPicture$ !: Subscription

  selectedForRestock : Inventory | null = null
  paginationData !: PaginatedData<Inventory>
  paginationPayload : InventoryPaginationPayload = {
    row: 10,
    page: 1
  }
  imageDataMap: { [key: number]: string } = {};
  reStockVisible = false;
  quantity : number|null = null

  constructor(private inventoryService: InventoryService, private foodService: ManageFoodsService){super()}

  ngOnInit(): void {
      this.inventorySubscription$ = this.inventoryService.getInvnetoryData(this.paginationPayload).subscribe(
        (res) => {
          this.paginationData = res.data
          this.paginationData.content.forEach((menu) => {
            if(menu.photoId){
              this.getFoodPicture$ = this.foodService.getFoodPicture(menu.photoId).subscribe((imageBlob: Blob) => {
  
  
              this.createImageFromBlob(imageBlob, menu.photoId)
               .then((imageData) => {
                this.imageDataMap[menu.photoId] = imageData;
                
            })
            .catch((error) => {
                console.log("error when trying to access")
            });
            });
          }
          });
        }
      )
  }

  addStock(quantity: number){

  }
  ngOnDestroy(): void {
      if(this.getFoodPicture$){
        this.getFoodPicture$.unsubscribe()
      }
      if(this.inventorySubscription$){
        this.inventorySubscription$.unsubscribe()
      }
  }
}
