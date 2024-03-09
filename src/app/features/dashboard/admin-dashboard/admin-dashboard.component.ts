import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription, delay, of } from 'rxjs';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { SalesData, SalesDataPayload } from '../dashboard-service/model/sales-data.model';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { UsersData, UsersDataPayload } from '../dashboard-service/model/user-data.model';
import { ManageOrdersNavbarService, OrderNav } from '../../management/manage-orders/manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { OrderData, OrderDataPayload } from '../dashboard-service/model/order-data.model';
import { RevenueData, RevenueDataPayload } from '../dashboard-service/model/revenue-data.model';
import { FoodMenuData, FoodMenuDataPayload } from '../dashboard-service/model/food-menu-data.model';
import { Router } from '@angular/router';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';
import { ManageFoodsService } from '../../management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { ManageUsersService } from '../../management/people-management/manage-user-body/manage-users/manage-users-service/manage-users.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends CommonVariable implements OnInit, OnDestroy {


  usersDataSubscription$ !: Observable<ResponseData<UsersData>>
  orderDataSubscription$ !: Observable<ResponseData<OrderData>>
  revenueDataSubscription$ !: Observable<ResponseData<RevenueData>>
  foodMenuDataSubscription$ !: Observable<ResponseData<FoodMenuData>>

  userDataPayload : UsersDataPayload = {}
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
  this.usersDataSubscription$ = this.dashboardService.getUsersData(this.userDataPayload);
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

  navigateToUserManagement(val?: string){

    if(val != undefined){
    if(val.toUpperCase() == 'INTERNAL'.toUpperCase()){
      this.userService.selectedOption = 'INTERNAL'
    }else if(val.toUpperCase() == 'ALL'.toUpperCase()){
      this.userService.selectedOption = 'ALL'
    }else{
    this.userService.selectedOption = 'EXTERNAL_USER'
    }
  }
    this.router.navigate(['/' + ManagementRouteConstant.userManagement]);
  }


  ngOnDestroy(): void {
   
  }

}
