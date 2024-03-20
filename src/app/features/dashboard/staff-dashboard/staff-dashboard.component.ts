import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';
import { ManageOrdersNavbarService, OrderNav } from '../../management/manage-orders/manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { ManageUsersService } from '../../management/people-management/manage-user-body/manage-users/manage-users-service/manage-users.service';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { FoodMenuData, FoodMenuDataPayload } from '../dashboard-service/model/food-menu-data.model';
import { OrderData, OrderDataPayload } from '../dashboard-service/model/order-data.model';
import { RevenueData, RevenueDataPayload } from '../dashboard-service/model/revenue-data.model';
import { UsersData, UsersDataPayload } from '../dashboard-service/model/user-data.model';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent 

extends CommonVariable implements OnInit, OnDestroy {


  orderDataSubscription$ !: Observable<ResponseData<OrderData>>
  revenueDataSubscription$ !: Observable<ResponseData<RevenueData>>
  foodMenuDataSubscription$ !: Observable<ResponseData<FoodMenuData>>
  revenueDataPayload : RevenueDataPayload = {}
  foodMenuDataPayload : FoodMenuDataPayload = {}

  orderDataPayload !: OrderDataPayload

  constructor(private dashboardService: DashboardService, public orderService: ManageOrdersNavbarService,
    private orderNavService: ManageOrdersNavbarService, private router: Router, private userService: ManageUsersService) {
    super()
  }


  ngOnInit() {
    this.orderDataPayload = {
      timeDifference: this.orderService.timeDifference
    }
  
  this.orderDataSubscription$ = this.dashboardService.getOrderData(this.orderDataPayload);
  this.revenueDataSubscription$ = this.dashboardService.getRevenueData(this.revenueDataPayload);
  this.foodMenuDataSubscription$ = this.dashboardService.getFoodMenuData(this.foodMenuDataPayload);

  }

  goToManageOrder(selected : string){
    if(selected.toUpperCase() == "ONLINE".toUpperCase()){
    this.orderNavService.selectedNavbar = OrderNav.ONLINE
  }else{
      this.orderNavService.selectedNavbar = OrderNav.ONSITE
    }
    this.router.navigate(['/' + ManagementRouteConstant.orderManagement]);
  }
  
  navigateToFoodMenu(){
    this.router.navigate(['/' + ManagementRouteConstant.foodManagement]);
  }

  navigateToStaffManagement(){
    this.router.navigate(['/' + ManagementRouteConstant.staffManagement]);
  }

  


  ngOnDestroy(): void {
   
  }



}
