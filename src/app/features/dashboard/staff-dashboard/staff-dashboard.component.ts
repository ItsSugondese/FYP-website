import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Observable, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';
import { ManageOrdersNavbarService, OrderNav } from '../../management/manage-orders/manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { ManageUsersService } from '../../management/people-management/manage-user-body/manage-users/manage-users-service/manage-users.service';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { FoodMenuData, FoodMenuDataPayload } from '../dashboard-service/model/food-menu-data.model';
import { OrderData, OrderDataPayload } from '../dashboard-service/model/order-data.model';
import { RevenueData, RevenueDataPayload } from '../dashboard-service/model/revenue-data.model';
import { UsersData, UsersDataPayload } from '../dashboard-service/model/user-data.model';
import { UserManagementPaymentService } from '../../management/people-management/user-management-payment/user-management-payment-service/user-management-payment.service';
import { SocketService } from '@shared/service/socket-servie/socket.service';

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

  orderSocket$ !: Subscription
  revenueSocket$ !: Subscription
  foodMenuSocket$ !: Subscription

  orderData !: OrderData
revenueData !: RevenueData
foodMenuData !: FoodMenuData

  orderDataSubscription$ !: Subscription
  revenueDataSubscription$ !: Subscription
  foodMenuDataSubscription$ !: Subscription
  revenueDataPayload : RevenueDataPayload = {}
  foodMenuDataPayload : FoodMenuDataPayload = {}

  orderDataPayload !: OrderDataPayload

  lastSelectedFilter !: string
  constructor(private dashboardService: DashboardService, public orderService: ManageOrdersNavbarService,
    private orderNavService: ManageOrdersNavbarService, private router: Router, private userService: ManageUsersService,
    public userPaymentManagementService: UserManagementPaymentService, private socketService: SocketService) {
    super()
  }


  ngOnInit() {

    this.orderSocket$ = this.socketService.orderSubject.subscribe(
      (res) => {
        this.fetchOrderData()
      }
    )
    this.revenueSocket$ = this.socketService.revenueSubject.subscribe(
      (res) => {
        this.revenueData = res
      }
    )
    this.foodMenuSocket$ = this.socketService.foodMenuSubject.subscribe(
      (res) => {
        this.foodMenuData = res
      }
    )


    this.lastSelectedFilter = this.userPaymentManagementService.selectedOption
    this.userPaymentManagementService.selectedOption = 'UNPAID';
    this.orderDataPayload = {
      timeDifference: this.orderService.timeDifference
    }
  
    this.fetchRevenueData()
    this.fetchOrderData()
    this.fetchFoodMenuData()

  }

  fetchRevenueData(){
    this.revenueDataSubscription$ = this.dashboardService.getRevenueData(this.revenueDataPayload).subscribe(
      (res) => {
        this.revenueData = res.data
      }
    )

  }

  fetchOrderData(){
    this.orderDataSubscription$ = this.dashboardService.getOrderData(this.orderDataPayload).subscribe(
      (res) => {
        this.orderData = res.data
      }
    );
  }

  fetchFoodMenuData(){
    this.foodMenuDataSubscription$ = this.dashboardService.getFoodMenuData(this.foodMenuDataPayload).subscribe(
      (res) => {
        this.foodMenuData = res.data
      }
    );
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
    this.userPaymentManagementService.selectedOption = this.lastSelectedFilter

    if (this.orderSocket$) {
      this.orderSocket$.unsubscribe();
    }
    if (this.revenueSocket$) {
      this.revenueSocket$.unsubscribe();
    }
    if (this.foodMenuSocket$) {
      this.foodMenuSocket$.unsubscribe();
    }

    if (this.orderDataSubscription$) {
      this.orderDataSubscription$.unsubscribe();
    }
    if (this.revenueDataSubscription$) {
      this.revenueDataSubscription$.unsubscribe();
    }
    if (this.foodMenuDataSubscription$) {
      this.foodMenuDataSubscription$.unsubscribe();
    }
  }



}
