import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';

@Component({
  selector: 'app-inventory-management-admin',
  templateUrl: './inventory-management-admin.component.html',
  styleUrls: ['./inventory-management-admin.component.scss']
})
export class InventoryManagementAdminComponent extends CommonVariable implements OnInit, OnDestroy {


  constructor(){super()}

  ngOnInit(): void {
      
  }
  ngOnDestroy(): void {
      
  }
}
