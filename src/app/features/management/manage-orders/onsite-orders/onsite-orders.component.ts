import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { OrderCommonVariable } from '@shared/helper/inherit/order/order-common-variable';
import { PaymentPayload } from '@shared/service/payment-service/model/user-payment.model';
import { PaymentService } from '@shared/service/payment-service/payment.service';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageFoodsService } from '../../manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { onsiteOrder } from './onsite-orders-service/model/onsite-order-interface';
import { onsiteOrderPagination } from './onsite-orders-service/model/onsite-orders-payload.model';
import { OnsiteOrdersService } from './onsite-orders-service/onsite-orders.service';
import { ManageOrdersNavbarService } from '../manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';

@Component({
  selector: 'app-onsite-orders',
  templateUrl: './onsite-orders.component.html',
  styleUrls: ['./onsite-orders.component.scss']
})
export class OnsiteOrdersComponent extends OrderCommonVariable implements OnInit, OnDestroy, OnChanges {

  @Input() searchedText : string | undefined
  @Input() selectedFoodFilter !: boolean
  payCashPopUp : boolean = false
  
  selectedOrderId !: number
  paidAmount : number = 0
  paginatedData !: PaginatedData<onsiteOrder>

  paginationJson !:  onsiteOrderPagination 

  getOrderSubscriable$ !: Subscription
  markAsReadSubscriable$ !: Subscription
  postPaymentSubscriable$ !: Subscription
  getFoodPicture$ !: Subscription
  onsiteOrderList !: onsiteOrder[]
  selectedOrder !: onsiteOrder | null;
  paymentPayload!: PaymentPayload
  imageDataMap: { [key: number]: string } = {};
  updateOrderSubscription$ !: Subscription

  constructor(public onsiteOrdersService : OnsiteOrdersService, private foodService: ManageFoodsService,
    private paymentService: PaymentService, private orderService: ManageOrdersNavbarService) {
    super()
  }
  
  ngOnInit(): void {
    
      this.getPaginatedData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.paginationJson) {
      this.paginationJson  = {
        page: 1,
        row : 10,
        onsiteOrderFilter: this.onsiteOrdersService.selectedOption,
        minuteRange : this.orderService.timeDifference
      }
    }
    if (changes.searchedText) {
        this.paginationJson.name = changes.searchedText.currentValue;
    }
    if (changes.selectedFoodFilter) {
        this.paginationJson.onsiteOrderFilter = this.onsiteOrdersService.selectedOption;
      }
      this.getPaginatedData(); 
  }

  cancelOrder(id: number){
    this.updateOrder(id, "REJECTED")
    
  }
  
  updateOrder(id: number, status: string){

    this.updateOrderSubscription$ = this.onsiteOrdersService.updateOrderStatus(id, status).subscribe(
      res => {
        this.updateOrderSubscription$.unsubscribe()
        this.showPopUp = false
        this.getPaginatedData()
      }
    )

  }

  selectedOrderTypeToFilter(event: string | null){
    this.onsiteOrdersService.selectedOption = event!
      // this.paginationJson.onsiteOrderFilter = event!;
    
    this.getPaginatedData()
  }

  handleMarkAsReadChange(id: number, index: number){ 
    this.markAsReadSubscriable$ = this.onsiteOrdersService.markAsRead(id, index).subscribe(
      (response: any) => {
        this.paginatedData.content.splice(index, 1);
        this.markAsReadSubscriable$.unsubscribe()
        this.getPaginatedData()
      }
    )  
  }

  typedOrderToFilter(event: string){
    if(event.trim() != ''){
      this.paginationJson.name = event
    }else{
      this.paginationJson.name = undefined
    }
    this.getPaginatedData()
  }

  
  



  getPaginatedData() {
    this.paginationJson.onsiteOrderFilter = this.onsiteOrdersService.selectedOption
    
    this.getOrderSubscriable$ = this.onsiteOrdersService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.paginatedData = response.data
          this.paginatedData.content.forEach((order) => {
            order.orderFoodDetails.forEach((foodDetails) => {

              if(foodDetails.photoId){
                this.getFoodPicture$ = this.foodService.getFoodPicture(foodDetails.photoId).subscribe((imageBlob: Blob) => {
    
    
                this.createImageFromBlob(imageBlob, foodDetails.photoId)
                 .then((imageData) => {
                  this.imageDataMap[foodDetails.photoId] = imageData;
                  
              })
              .catch((error) => {
                  console.log("error when trying to access")
              });
              });
            }
            }

            )
          }); 

          
        }
      )
  }

 

 

  
  pay(amount : number){
    this.paymentPayload = {
      totalAmount: this.selectedOrder!.totalPrice,
      paidAmount: Number(amount),
      dueAmount: this.paidAmount > this.selectedOrder!.totalPrice ? 0 :  this.selectedOrder!.totalPrice - this.paidAmount,
      onsiteOrderId: this.selectedOrder!.id,
      userId: this.selectedOrder!.userId
    }
 
   this.postPaymentSubscriable$ = this.paymentService.postPayment(this.paymentPayload).subscribe(
    (respose) => {
      this.paidAmount = 0
      this.payCashPopUp = false
      this.getPaginatedData()
    }
   );
  }

  

  ngOnDestroy(): void {
    if(this.getOrderSubscriable$){
      this.getOrderSubscriable$.unsubscribe();
    }
    if(this.postPaymentSubscriable$){
      this.postPaymentSubscriable$.unsubscribe();
    }
    if(this.markAsReadSubscriable$){
      this.markAsReadSubscriable$.unsubscribe();
    }
    if(this.updateOrderSubscription$){
      this.updateOrderSubscription$.unsubscribe();
    }
    if(this.getFoodPicture$){
      this.getFoodPicture$.unsubscribe()
    }
  }
}
