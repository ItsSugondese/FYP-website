import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserOrderHistory } from './user-order-service/model/user-order.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { UserOrderHistoryPagination } from './user-order-service/model/user-order.payload';
import { Subscription } from 'rxjs';
import { UserOrderService } from './user-order-service/user-order.service';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ManageFoodsService } from '../management/manage-foods/manage-foods-service/manage-foods.service';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { SidenavService } from 'src/app/shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { FoodMenuPagination } from '../management/manage-foods/manage-foods-service/model/food-menu.payload';
import { foodOrdering } from 'src/app/shared/model/order/food-order.model';
import { Router } from '@angular/router';
import { UserRouteConstant } from 'src/app/constant/routing/user-routing-constant.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit, OnDestroy {
  foodId !: Number;
  paginatedData !: ResponseData<PaginatedData<UserOrderHistory>>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  finalPopUp:boolean = false
  collapsed !: boolean;
  getFoodPicture$!: Subscription
  getFoodMenu$!: Subscription
  paginationJson : UserOrderHistoryPagination = {
    fromDate: '2024-01-01',
      toDate: '2024-01-31',
      row: 10,
      page: 1,
  }
  foodMenuPaginationJson : FoodMenuPagination = {
    page: 1,
    row: 10,
  }
  fromTime = new Date();
  getStaffSubscriable$ !: Subscription

  imageDataMap: { [key: number]: string } = {};
  tableSizes = [5, 10, 15, 20]
  selectedOrder !: UserOrderHistory
  navbarCollapse$ !: Subscription;

  // @ViewChild('quantityInput') quantityInput !: ElementRef;
  constructor(private userOrderService : UserOrderService, private foodService: ManageFoodsService,
    private sideNavService: SidenavService, private router: Router, private foodMenuSerivce: ManageFoodsService) {

  }

  foodOrderList : foodOrdering[] = []
  removeFoodOrder : Number[] = []
  foodSearch : string = ""
  
  ngOnInit(): void {
    this.getPaginatedData(this.paginationJson);
    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });
  }

  togglePopUp(){
    this.finalPopUp = !this.finalPopUp;
  }

  

  searchFood(val : string){
   
    console.log(val)
    if(this.foodSearch.trim() !== ''){
      this.getFoodMenuPaginatedData(this.foodMenuPaginationJson);
    }
   
  }
 
  toggleOrderDetailsPopUp(orderDetails: UserOrderHistory){

    // this.togglePopUp();
    // console.log(this.selectedOrder)
  


    if(orderDetails.orderType == 'ONLINE_ORDER'){
   
    
    this.userOrderService.setOrderedFood(orderDetails)
    this.router.navigate(['/' + UserRouteConstant.homepage]);
    }
  }


  getPaginatedData(json: UserOrderHistoryPagination) {
    this.getStaffSubscriable$ = this.userOrderService.getData(json).subscribe(
        (response) => {
          this.paginatedData = response
          this.paginatedData.data.content.forEach((orderDetails) => {
            orderDetails.orderFoodDetails.forEach(
              (foodItem) => {
                if(foodItem.photoId){
                  if(!(foodItem.photoId in  this.imageDataMap)){
                  this.getFoodPicture$ = this.foodService.getFoodPicture(foodItem.photoId).subscribe((imageBlob: Blob) => {
      
      
                  createImageFromBlob(imageBlob, foodItem.photoId)
                   .then((imageData) => {
                    this.imageDataMap[foodItem.photoId] = imageData;
                })
                .catch((error) => {
                    console.log("error when trying to access")
                });
                });
              }
              }
              }
            )
          }); 
        }
      )
  }
  getFoodMenuPaginatedData(json: FoodMenuPagination) {
    this.getFoodMenu$ = this.userOrderService.getData(json).subscribe(
        (response) => {
          this.paginatedData = response
          this.paginatedData.data.content.forEach((orderDetails) => {
            orderDetails.orderFoodDetails.forEach(
              (foodItem) => {
                if(foodItem.photoId){
                  if(!(foodItem.photoId in  this.imageDataMap)){
                  this.getFoodPicture$ = this.foodService.getFoodPicture(foodItem.photoId).subscribe((imageBlob: Blob) => {
      
      
                  createImageFromBlob(imageBlob, foodItem.photoId)
                   .then((imageData) => {
                    this.imageDataMap[foodItem.photoId] = imageData;
                })
                .catch((error) => {
                    console.log("error when trying to access")
                });
                });
              }
              }
              }
            )
          }); 
        }
      )
  }

 

  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.paginationJson.page = event
    this.getPaginatedData(this.paginationJson);

  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      this.paginationJson.row = event.target.value
      this.getPaginatedData(this.paginationJson);
    }
    console.log(this.paginationNavigator.row)
  }

  ngOnDestroy(): void {
    if(this.getStaffSubscriable$){
      this.getStaffSubscriable$.unsubscribe();
    }
    if(this.navbarCollapse$){
      this.navbarCollapse$.unsubscribe();
    }
  }
}
