import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { OnsiteOrdersService } from './onsite-orders-service/onsite-orders.service';
import { PaymentPayload, onsiteOrderPagination } from './onsite-orders-service/model/onsite-orders-payload.model';
import { onsiteOrder } from './onsite-orders-service/model/onsite-order-interface';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';

@Component({
  selector: 'app-onsite-orders',
  templateUrl: './onsite-orders.component.html',
  styleUrls: ['./onsite-orders.component.scss']
})
export class OnsiteOrdersComponent implements OnInit, OnDestroy {


  paidAmount : number = 0
  paginatedData !: ResponseData<PaginatedData<onsiteOrder>>
  paginationJson :  onsiteOrderPagination = {
    page: 1,
    row : 5
  }
  getOrderSubscriable$ !: Subscription
  postPaymentSubscriable$ !: Subscription
  onsiteOrderList !: onsiteOrder[]
  selectedOrder !: onsiteOrder | null;
  paymentPayload!: PaymentPayload

  constructor(private onsiteOrdersService : OnsiteOrdersService) {
    
  }
  
  ngOnInit(): void {
      this.getPaginatedData();
  }

  

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationJson.row  =  event.target.value
      this.getPaginatedData();
    }
  }

  getPaginatedData() {
    this.getOrderSubscriable$ = this.onsiteOrdersService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.paginatedData = response
        }
      )
  }

 

  onTableDataChange(event: any) {
    this.paginationJson.page = event
    this.getPaginatedData();
  }

  
  pay(amount : number){
    this.paymentPayload = {
      totalAmount: this.selectedOrder!.totalPrice,
      paidAmount: Number(amount),
      dueAmount: this.paidAmount > this.selectedOrder!.totalPrice ? 0 :  this.selectedOrder!.totalPrice - this.paidAmount,
      onsiteOrderId: this.selectedOrder!.id,
      userId: this.selectedOrder!.userId
    }
    
   this.postPaymentSubscriable$ = this.onsiteOrdersService.postPayment(this.paymentPayload).subscribe(
    (respose) => {
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
  }
}
