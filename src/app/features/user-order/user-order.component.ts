import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserOrderHistory } from './user-order-service/model/user-order.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { UserOrderHistoryPagination } from './user-order-service/model/user-order.payload';
import { Subscription } from 'rxjs';
import { UserOrderService } from './user-order-service/user-order.service';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { SidenavService } from 'src/app/shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { foodOrdering } from 'src/app/shared/model/order/food-order.model';
import { Router } from '@angular/router';
import { UserRouteConstant } from 'src/app/constant/routing/user-routing-constant.model';
import { FoodMenuPagination } from '../management/manage-food-body/manage-foods/manage-foods-service/model/food-menu.payload';
import { ManageFoodsService } from '../management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { CommonVariable } from '@shared/helper/inherit/common-variable';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent extends CommonVariable implements OnInit, OnDestroy {
  historyData !: UserOrderHistory[]
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
  getOrderHistorySubscriable$ !: Subscription

  imageDataMap: { [key: number]: string } = {};
  selectedOrder !: UserOrderHistory

  constructor(public userOrderService : UserOrderService, private foodService: ManageFoodsService,
    private sideNavService: SidenavService, private router: Router) {
      super()

  }

  
  ngOnInit(): void {
    this.getPaginatedData();
  }


  
 
  toggleOrderDetailsPopUp(orderDetails: UserOrderHistory){
    this.userOrderService.setOrderedFood(orderDetails)
    this.router.navigate(['/' + UserRouteConstant.homepage]);
  }

  cancelOrder(){
    
  }

  getPaginatedData() {
    this.getOrderHistorySubscriable$ = this.userOrderService.getData(this.paginationJson).subscribe(
        (response) => {
          this.historyData = response.data
          this.historyData.forEach((orderDetails) => {
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




  ngOnDestroy(): void {
    if(this.getOrderHistorySubscriable$){
      this.getOrderHistorySubscriable$.unsubscribe();
    }
    
  }
}
