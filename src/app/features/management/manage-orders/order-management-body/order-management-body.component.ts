import { Component, Input, OnInit } from '@angular/core';
import { ManageOrdersNavbarService } from '../manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-management-body',
  templateUrl: './order-management-body.component.html',
  styleUrls: ['./order-management-body.component.scss']
})
export class OrderManagementBodyComponent implements OnInit{

  @Input() isOnsite : boolean = true;
  // isOnsite !: boolean
  onsiteGetter$ !: Subscription;
  constructor(private managementNavbarService: ManageOrdersNavbarService){}

  ngOnInit(): void {

  }

  onToggleOrder(data: boolean){
    this.isOnsite = data
  }
}
