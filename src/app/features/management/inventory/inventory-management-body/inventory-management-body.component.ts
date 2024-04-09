import { Component } from '@angular/core';
import { Inventory } from '../inventory-service/model/inventory-payload-model';

@Component({
  selector: 'app-inventory-management-body',
  templateUrl: './inventory-management-body.component.html',
  styleUrls: ['./inventory-management-body.component.scss']
})
export class InventoryManagementBodyComponent {
  isInspecting : boolean = false;
  inventory !: Inventory

  
  handleIsInspecting(event: boolean){
    this.isInspecting = event
  }

  getInventory(event: Inventory){
    this.inventory = event
  }
}
