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
import { TableData, TableDataPayload } from '../dashboard-service/model/table-data.model';
import { SocketService } from '@shared/service/socket-servie/socket.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends CommonVariable implements OnInit, OnDestroy {


  userData !: UsersData
  orderData !: OrderData
  tableData !: TableData
  revenueData !: RevenueData
  foodMenuData !: FoodMenuData
  usersDataSubscription$ !: Subscription
  // usersDataSubscription$ !: Observable<ResponseData<UsersData>>
  // orderDataSubscription$ !: Observable<ResponseData<OrderData>>
  orderDataSubscription$ !: Subscription
  revenueDataSubscription$ !: Subscription
  foodMenuDataSubscription$ !: Subscription
  tableDataSubscription$ !: Subscription


  orderSocket$ !: Subscription
  tableSocket$ !: Subscription
  revenueSocket$ !: Subscription
  foodMenuSocket$ !: Subscription
  userDataSocket$ !: Subscription

  userDataPayload : UsersDataPayload = {}
  revenueDataPayload : RevenueDataPayload = {}
  foodMenuDataPayload : FoodMenuDataPayload = {}
  tableDataPayload : TableDataPayload = {}

  orderDataPayload !: OrderDataPayload

  constructor(private dashboardService: DashboardService, public orderService: ManageOrdersNavbarService,
    private orderNavService: ManageOrdersNavbarService, private router: Router, private userService: ManageUsersService,
  private socketService: SocketService) {
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
    this.tableSocket$ = this.socketService.tableSubject.subscribe(
      (res) => {
        this.tableData = res
      }
    )
    this.foodMenuSocket$ = this.socketService.foodMenuSubject.subscribe(
      (res) => {
        this.foodMenuData = res
      }
    )
    this.userDataSocket$ = this.socketService.userDataSubject.subscribe(
      (res) => {
        this.userData = res
      }
    )
    this.orderDataPayload = {
      timeDifference: this.orderService.timeDifference
    }
  this.getData()

  }

  getData(){
    this.fetchOrderData();
    this.fetchTableData();
    this.fetchRevenueData();
    this.fetchFoodMenuData();
   this.fetchUserData()
  }

  fetchFoodMenuData(){
    this.foodMenuDataSubscription$ = this.dashboardService.getFoodMenuData(this.foodMenuDataPayload).subscribe(
      (res) => {
        this.foodMenuData = res.data
      }
    );
  }

  fetchUserData(){
    this.usersDataSubscription$ = this.dashboardService.getUsersData(this.userDataPayload).subscribe(
      (res) => {
        this.userData = res.data
      }
    );
  }

  fetchOrderData(){
    this.orderDataSubscription$ = this.dashboardService.getOrderData(this.orderDataPayload).subscribe(
      (res) => {
        this.orderData = res.data
      }
    );
  }

  fetchTableData(){
    this.tableDataSubscription$ = this.dashboardService.getTableData(this.tableDataPayload).subscribe(
      (res) => {
        this.tableData = res.data
      }
    )
  }

  fetchRevenueData(){
    this.revenueDataSubscription$ = this.dashboardService.getRevenueData(this.revenueDataPayload).subscribe(
      (res) => {
        this.revenueData = res.data
      }
    )

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
  navigateToTableManagement(){
    this.router.navigate(['/' + ManagementRouteConstant.tableManagement]);
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
   if(this.usersDataSubscription$){
    this.usersDataSubscription$.unsubscribe()
   }
   if(this.orderDataSubscription$){
    this.orderDataSubscription$.unsubscribe()
   }
   if(this.tableDataSubscription$){
    this.tableDataSubscription$.unsubscribe()
   }
   if(this.revenueDataSubscription$){
    this.revenueDataSubscription$.unsubscribe()
   }

   if(this.foodMenuDataSubscription$){
    this.foodMenuDataSubscription$.unsubscribe()
   }



   if (this.orderSocket$) {
    this.orderSocket$.unsubscribe();
  }
  if (this.tableSocket$) {
    this.tableSocket$.unsubscribe();
  }
  if (this.revenueSocket$) {
    this.revenueSocket$.unsubscribe();
  }
  if (this.foodMenuSocket$) {
    this.foodMenuSocket$.unsubscribe();
  }
  if (this.userDataSocket$) {
    this.userDataSocket$.unsubscribe();
  }
  }

}
