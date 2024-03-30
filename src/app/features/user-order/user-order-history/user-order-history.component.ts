import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { SidenavService } from '@shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageFoodsService } from '../../management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { onsiteOrder } from '../../management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-order-interface';
import { OrderHistoryPagination } from '../../management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-orders-payload.model';
import { OnsiteOrdersService } from '../../management/manage-orders/onsite-orders/onsite-orders-service/onsite-orders.service';
import { KhaltiCheckoutService } from '@shared/service/payment-service/khati/khalti-checkout.service';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss']
})
export class UserOrderHistoryComponent extends CommonVariable implements OnInit, OnDestroy {

  viewOrderPopUp: boolean = false;
  selectedOrder !: onsiteOrder | null
  orderHistoryList : onsiteOrder[] = []

 
  orderHistoryPaginatedPayload !: OrderHistoryPagination
  orderHistoryPaginatedData !: PaginatedData<onsiteOrder>

  orderHistorySubscription$ !: Subscription
  navbarCollapse$ !: Subscription;
  getFoodPicture$!: Subscription

  imageDataMap: { [key: number]: string } = {};
  selectedHistoryOption = 'ALL'


  collapsed !: boolean;
  selectedOrderToPay !: onsiteOrder;

  paymentSuccessSubscription$ !: Subscription

  constructor(public orderService: OnsiteOrdersService, private sideNavService: SidenavService,
    private foodService: ManageFoodsService, private khaltiService: KhaltiCheckoutService) {
    super()
  }

  ngOnInit(): void {
    this.orderHistoryPaginatedPayload = {
      row: 9,
      page : 1
    }

    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });

    this.paymentSuccessSubscription$ = this.khaltiService.paymentSuccess$.subscribe(
      (res) => {
        if(this.selectedOrderToPay){
          this.selectedOrderToPay.payStatus = "Paid";
          this.selectedOrderToPay.payStatusCheck = 'PAID'
        }
      }
    )
  }
  

  
  typedOrderToFilter(event: string){
    if(event.trim() == ''){
      this.orderHistoryPaginatedPayload.name = undefined
    }else{
      this.orderHistoryPaginatedPayload.name = event
    }
    this.setPageAndListToRestart()
    this.fetchOrderHistory() 
  }
 


  selectedFromOrderFilter(event: string ){
    this.selectedHistoryOption = event
    
    if(event == 'ALL'){
      this.orderHistoryPaginatedPayload.payStatus  = undefined
    }else{
      this.orderHistoryPaginatedPayload.payStatus = event
    }

    this.setPageAndListToRestart()

    this.fetchOrderHistory()
  }

  onScroll = () => {
    if (this.orderHistoryPaginatedData.totalPages != this.orderHistoryPaginatedPayload.page) {
      this.orderHistoryPaginatedPayload.page++
      this.fetchOrderHistory()
    }
  }

  

  toggleOrderDetailsPopUp(order: onsiteOrder){

  }

  setPageAndListToRestart(){
    this.orderHistoryList = []
    this.orderHistoryPaginatedPayload.page = 1
  }

  onRangeSelect(event: Date[]) {
    const fromDate = event[0];
    const toDate = event[event.length - 1];

    const fromDateString = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
      const toDateString = toDate.getFullYear() + '-' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '-' + ('0' + toDate.getDate()).slice(-2);
    this.orderHistoryPaginatedPayload.fromDate = fromDateString
    this.orderHistoryPaginatedPayload.toDate = toDateString
    if(this.orderHistoryPaginatedPayload.payStatus == undefined || this.orderHistoryPaginatedPayload.payStatus == 'PAID'){

    this.setPageAndListToRestart()
    this.fetchOrderHistory()
    }
}
  
  fetchOrderHistory(){
    
    this.orderHistorySubscription$ = this.orderService.getUserAllOrderHistoryData(this.orderHistoryPaginatedPayload).subscribe(
      (res) => {
        this.orderHistorySubscription$.unsubscribe()
        this.orderHistoryPaginatedData = res.data
        this.orderHistoryList = [...this.orderHistoryList, ...this.orderHistoryPaginatedData.content]
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

  payWithKhalti(order: onsiteOrder){
    this.selectedOrderToPay = order;
    this.khaltiService.initCheckout(order);
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
