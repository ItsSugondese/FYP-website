import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { ManageOrdersNavbarService } from '../management/manage-orders/manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { OnsiteOrdersService } from '../management/manage-orders/onsite-orders/onsite-orders-service/onsite-orders.service';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { onsiteOrder } from '../management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-order-interface';
import { OrderHistoryPagination } from '../management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-orders-payload.model';
import { SidenavService } from '@shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { ManageFoodsService } from '../management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent extends CommonVariable implements OnInit, OnDestroy {


  orderHistoryList : onsiteOrder[] = []
  shownItems: onsiteOrder[] = []; // List to store items that have been previously shown

  // Function to add new items to the shownItems list
  updateShownItems(newItems: onsiteOrder[]) {
    // Add only the new items to the shownItems list
    for (const newItem of newItems) {
      if (!this.shownItems.some(item => item.id === newItem.id)) {
        this.shownItems.push(newItem);
      }
    }
  }
  orderHistoryPaginatedPayload !: OrderHistoryPagination
  orderHistoryPaginatedData !: PaginatedData<onsiteOrder>

  orderHistorySubscription$ !: Subscription
  navbarCollapse$ !: Subscription;
  getFoodPicture$!: Subscription

  imageDataMap: { [key: number]: string } = {};


  collapsed !: boolean;

  loadMore : boolean = false;

  constructor(public orderService: OnsiteOrdersService, private sideNavService: SidenavService,
    private foodService: ManageFoodsService) {
    super()
  }

  

 

  ngOnInit(): void {
    this.orderHistoryPaginatedPayload = {
      row: 6,
      page : 1
    }

    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });
  }

  onScroll = () => {
    if (this.orderHistoryPaginatedData.totalPages != this.orderHistoryPaginatedPayload.page
      && !this.loadMore) {
      this.orderHistoryPaginatedPayload.page++
      this.fetchOrderHistory()
    }
  }

  

  toggleOrderDetailsPopUp(order: onsiteOrder){

  }

  onRangeSelect(event: Date[]) {
    const fromDate = event[0];
    const toDate = event[event.length - 1];

    const fromDateString = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
      const toDateString = toDate.getFullYear() + '-' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '-' + ('0' + toDate.getDate()).slice(-2);
    this.orderHistoryPaginatedPayload.fromDate = fromDateString
    this.orderHistoryPaginatedPayload.toDate = toDateString

    this.fetchOrderHistory()
}
  
  fetchOrderHistory(){
    
    this.orderHistorySubscription$ = this.orderService.getOrderHistoryData(this.orderHistoryPaginatedPayload).subscribe(
      (res) => {
        this.orderHistorySubscription$.unsubscribe()
        this.orderHistoryPaginatedData = res.data
        this.orderHistoryList = [...this.orderHistoryList, ...this.orderHistoryPaginatedData.content]
        console.log(this.orderHistoryList.length)
        this.orderHistoryPaginatedData.content.forEach((orderDetails) => {
          orderDetails.orderFoodDetails.forEach(
            (foodItem) => {
              if(foodItem.photoId){
                if(!(foodItem.photoId in  this.imageDataMap)){
                this.getFoodPicture$ = this.foodService.getFoodPicture(foodItem.photoId).subscribe((imageBlob: Blob) => {
    
    
                this.createImageFromBlob(imageBlob, foodItem.photoId)
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
      if(this.orderHistorySubscription$){
        this.orderHistorySubscription$.unsubscribe()
      }
      if(this.navbarCollapse$){
        this.navbarCollapse$.unsubscribe()
      }
  }
}
