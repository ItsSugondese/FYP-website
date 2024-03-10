import { Component, Input, OnInit } from '@angular/core';
import { ManageOrdersNavbarService } from '../manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { Subscription } from 'rxjs';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { extend } from 'jquery';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { OnsiteOrdersService } from '../onsite-orders/onsite-orders-service/onsite-orders.service';

enum OrderNav{
  ONSITE = "Onsite",
  ONLINE = "Online"
}

@Component({
  selector: 'app-order-management-body',
  templateUrl: './order-management-body.component.html',
  styleUrls: ['./order-management-body.component.scss']
})
export class OrderManagementBodyComponent extends CommonVariable implements OnInit{

   searchText : string | undefined 
   updatedSelected : boolean = true

  constructor(public managementNavbarService: ManageOrdersNavbarService, public onsiteOrdersService: OnsiteOrdersService 
    ){
    super()
  }

  ngOnInit(): void {
  }

  selectedOrderTypeToFilter(event: string ){
    this.onsiteOrdersService.selectedOption = event!
    this.updatedSelected = !this.updatedSelected;
  }

  typedOrderToFilter(event: string){
    console.log(event)
    if(event.trim() == ''){
      this.searchText = undefined
    }else{
      this.searchText = event
    }

    console.log(this.searchText)
  }


}
