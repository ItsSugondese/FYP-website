import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { InventoryService } from '../inventory-service/inventory.service';
import { Subscription } from 'rxjs';
import { Inventory, InventoryLogPayload, InventoryMenuLog, InventoryPaginationPayload, InventoryPayload } from '../inventory-service/model/inventory-payload-model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageFoodsService } from '../../manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { foodMenu } from '@shared/model/food/food.model';

@Component({
  selector: 'app-inventory-management-admin',
  templateUrl: './inventory-management-admin.component.html',
  styleUrls: ['./inventory-management-admin.component.scss']
})
export class InventoryManagementAdminComponent extends CommonVariable implements OnInit, OnDestroy {

  @Output() sendInventory : EventEmitter<Inventory> = new EventEmitter()
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()

  addInventorySubscription$ !: Subscription
  inventorySubscription$ !: Subscription
  getFoodPicture$ !: Subscription

  selectedForRestock : Inventory | null = null
  selectedForLogging : Inventory | null = null

  isSelected = false
  paginationData !: PaginatedData<Inventory>
  paginationPayload : InventoryPaginationPayload = {
    row: 10,
    page: 1
  }
 
  imageDataMap: { [key: number]: string } = {};
  reStockVisible = false;
  quantity : number|null = null

  constructor(public inventoryService: InventoryService, private foodService: ManageFoodsService){super()}

  ngOnInit(): void {
    this.fetchInventory();
  }
  
  fetchInventory(){
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
    const payload : InventoryPayload = {
      stock:  quantity,
      foodId : this.selectedForRestock!.id
    }

    this.addInventorySubscription$ = this.inventoryService.postData(payload).subscribe(
      (res) => {
        this.addInventorySubscription$.unsubscribe()
        this.selectedForRestock = null;

        const modal = document.getElementById('exampleModal'); // Replace 'your-modal-id' with the actual ID of your modal
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop');
        for (let i = 0; i < modalBackdrop.length; i++) {
          document.body.removeChild(modalBackdrop[i]);
        }
      }

      this.fetchInventory()

      }
    )
  }


  ngOnDestroy(): void {
      if(this.getFoodPicture$){
        this.getFoodPicture$.unsubscribe()
      }
      if(this.inventorySubscription$){
        this.inventorySubscription$.unsubscribe()
      }
      if(this.addInventorySubscription$){
        this.addInventorySubscription$.unsubscribe()
      }
  }
}
