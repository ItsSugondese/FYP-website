import { Component, Input, OnInit } from '@angular/core';
import { ManageOrdersNavbarService } from '../manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { Subscription } from 'rxjs';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { extend } from 'jquery';
import { CommonVariable } from '@shared/helper/inherit/common-variable';

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


  constructor(public managementNavbarService: ManageOrdersNavbarService){
    super()
  }

  ngOnInit(): void {

  }


}
