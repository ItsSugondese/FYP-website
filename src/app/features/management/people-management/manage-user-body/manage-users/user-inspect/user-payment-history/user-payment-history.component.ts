import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { UserPaymentHistoryService } from './user-payment-history-service/user-payment-history.service';
import { PaymentService } from '@shared/service/payment-service/payment.service';
import { Observable, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { OnsiteOrdersService } from 'src/app/features/management/manage-orders/onsite-orders/onsite-orders-service/onsite-orders.service';
import { OnsiteOrderOfUserPagination, onsiteOrderPagination } from 'src/app/features/management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-orders-payload.model';
import { onsiteOrder } from 'src/app/features/management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-order-interface';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageFoodsService } from 'src/app/features/management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { PaymentHistoryOfOrder, RemainingPaymentPayload } from '@shared/service/payment-service/model/user-payment.model';

@Component({
  selector: 'app-user-payment-history',
  templateUrl: './user-payment-history.component.html',
  styleUrls: ['./user-payment-history.component.scss']
})
export class UserPaymentHistoryComponent extends CommonVariable implements OnInit, OnDestroy {

  @Input() userId !: number
  amountToPaySubscription$ !: Observable<ResponseData<number>>
  paymentHistoryOfOrderSubscription$ !: Observable<ResponseData<PaymentHistoryOfOrder[]>>
  paginationJson: OnsiteOrderOfUserPagination = {
    page: 1,
    row: this.selectedRow,
    userId: this.userId
  }
  paginatedData !: PaginatedData<onsiteOrder>
  getOrderSubscriable$ !: Subscription
  postRemainingPaymentSubscriable$ !: Subscription
  imageDataMap: { [key: number]: string } = {};
  getFoodPicture$ !: Subscription
  selectedOrder !: onsiteOrder
  showOrderPopup: boolean = false;
  paidAmount: number = 0
  payCashPopUp: boolean = false;


  constructor(public paymentHistoryService: UserPaymentHistoryService, private paymentService: PaymentService,
    public onsiteOrdersService: OnsiteOrdersService, private foodService: ManageFoodsService) {
    super()
  }

  ngOnInit(): void {
    this.paginationJson.userId = this.userId
    this.amountToPayData()
    this.getPaginatedData()
  }

  amountToPayData(){
    this.amountToPaySubscription$ = this.paymentService.getUserAmountToPay(this.userId)

  }
 

  inspectingOrder(data: onsiteOrder) {
    this.showOrderPopup = true;
    this.selectedOrder = data
    this.paymentHistoryOfOrderSubscription$ = this.paymentService.getUserPaymentHistory(this.selectedOrder.id);
  }





  selectedPaidTypeToFilter(event: string | null) {
    this.paymentHistoryService.selectedOption = event!;
    this.getPaginatedData();
  }

  onTableDataChange(event: any) {
    this.paginationJson.page = event
    this.getPaginatedData();
  }

  onSelectedDropdown(event: any) {
    if (this.paginationJson.row != event) {
      this.paginationJson.row = event
      this.paginationJson.page = 1
      this.getPaginatedData();
    }
  }


  getPaginatedData() {
    this.paginationJson.payStatus = this.paymentHistoryService.selectedOption == 'ALL' ? undefined : this.paymentHistoryService.selectedOption.toUpperCase()
    this.getOrderSubscriable$ = this.onsiteOrdersService.getUserOnsiteDataData(
      this.paginationJson).subscribe(
        (response) => {
          this.paginatedData = response.data
          
          this.paginatedData.content.forEach((order) => {
            order.orderFoodDetails.forEach((foodDetails) => {

              if (foodDetails.photoId) {
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

  ngOnDestroy(): void {
    if (this.getOrderSubscriable$) {
      this.getOrderSubscriable$.unsubscribe();
    }
    if (this.getFoodPicture$) {
      this.getFoodPicture$.unsubscribe()
    }
    if (this.postRemainingPaymentSubscriable$) {
      this.postRemainingPaymentSubscriable$.unsubscribe()
    }
  }



}
