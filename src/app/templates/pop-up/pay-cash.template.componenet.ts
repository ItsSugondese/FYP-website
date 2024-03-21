import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { RemainingPaymentPayload } from '@shared/service/payment-service/model/user-payment.model';
import { PaymentService } from '@shared/service/payment-service/payment.service';
import { Subscription } from 'rxjs';
import { UserPaymentHistoryService } from 'src/app/features/management/people-management/manage-user-body/manage-users/user-inspect/user-payment-history/user-payment-history-service/user-payment-history.service';


@Component({
  selector: 'pay-cash-template',
  template: `
 <p-dialog [(visible)]="visible" [closable]="true" [style]="{'width': '700px'}" [modal]="true"
 (onHide)="afterHide()" >


<ng-container>
  <div class="container-box">

    <div class="item-description flex flex-col mt-2">


      <div class="flex flex-col justify-center items-center">
        <div class="text-xl">
          Total To Pay: <span class="text-customPrimary ">{{currency}} {{max}}</span>
        </div>
      </div>
    </div>




    <form class="my-4">
      <div class="flex justify-center  ">
        <div class="text-[#343A40] ">{{currency}}</div>

        <input
          class="ml-4 w-20 border-2 text-center p-0 border-[#CED4DA] focus:border-customPrimary  focus:outline-none"
          id="amount" [min]="min" [max]="max" [(ngModel)]="paidAmount" name="quantity">

      </div>

    </form>

    <div class="flex justify-center">
      <button type="submit" data-dismiss="modal"
        [ngClass]="{'disabled-button': paidAmount == null  || paidAmount <= 0 || paidAmount >  max}"
        (click)="postRemainingPayment(paidAmount)"
        class="text-white bg-customPrimary hover:cursor-pointer  items-center rounded px-2  py-1.5 text-base">Pay</button>

    </div>
  </div>
</ng-container>
</p-dialog>
  `,
  styles: [
],
})
export class PayCashComponent extends CommonVariable implements OnInit, OnDestroy{
  @Input() visible !: boolean
  @Input() min !: number
  @Input() max !: number
  @Input() userId !: number

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() postStatus: EventEmitter<boolean> = new EventEmitter();

  postRemainingPaymentSubscriable$ !: Subscription


  paidAmount: number = 0

    constructor(private paymentService: PaymentService,) {
      super()
     }
  

    ngOnInit(): void {
        
    }

    postRemainingPayment(amount: number) {
      const payload: RemainingPaymentPayload = {
        paidAmount: amount,
        userId: this.userId
      }
      this.postRemainingPaymentSubscriable$ = this.paymentService.postRemainingPayment(payload).subscribe(
        (res) => {
          this.postRemainingPaymentSubscriable$.unsubscribe()
          this.postStatus.emit(true)
        }
      )
    }

    afterHide() {
      this.visibleChange.emit(false);
  }

    ngOnDestroy(): void {
        
    }
    
}
