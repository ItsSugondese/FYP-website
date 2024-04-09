import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Inventory, InventoryLogPayload, InventoryMenuLog, InventoryPayload } from '../inventory-service/model/inventory-payload-model';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory-service/inventory.service';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';

@Component({
  selector: 'app-inventory-log',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.scss']
})
export class InventoryLogComponent implements OnInit, OnDestroy{
@Input() inventory !: Inventory
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()


  selectedLog !: InventoryMenuLog | null
  inventoryLogSubscription$ !: Subscription
  addInventorySubscription$ !: Subscription
  deleteInventorySubscription$ !: Subscription


  logPaginationData !: PaginatedData<InventoryMenuLog>

  paginationPayload : InventoryLogPayload = {
    row: 10,
    page: 1
  }
  editing = false;
  deleting = false;

  quantity : number| null = null

  constructor(public inventoryService: InventoryService){

  }
  ngOnInit(): void {
      this.fetchInventoryLog()
  }

  deleteStock(){
    this.deleteInventorySubscription$ = this.inventoryService.deleteInventoryLog(this.selectedLog!.id).subscribe(
      (res) => {
        this.deleting = false;
        this.fetchInventoryLog()
        
      }
    )
  }
  updateStock(quantity: number){
    const payload : InventoryPayload = {
      id: this.selectedLog!.id,
      stock:  quantity,
      foodId: this.inventory.id
    }

    this.addInventorySubscription$ = this.inventoryService.postData(payload).subscribe(
      (res) => {
        this.addInventorySubscription$.unsubscribe()
        this.editing = false;
      this.fetchInventoryLog()

      }
    )
  }

  fetchInventoryLog(){
    this.paginationPayload.foodId = this.inventory.id
    this.inventoryLogSubscription$ = this.inventoryService.getFoodMenuInvnetoryLog(this.paginationPayload).subscribe(
      (res) => {
        this.logPaginationData = res.data
        this.inventoryLogSubscription$.unsubscribe()
      }
    )

  }

  onTableDataChange(event: any) {
    this.paginationPayload.page = event
    this.fetchInventoryLog();
  }

  ngOnDestroy(): void {
      if(this.inventoryLogSubscription$){
        this.inventoryLogSubscription$.unsubscribe()
      }
  }
}
