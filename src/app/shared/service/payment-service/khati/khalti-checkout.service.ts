import { Injectable, OnDestroy, OnInit } from '@angular/core';
// @ts-ignore
import KhaltiCheckout from 'khalti-checkout-web';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { onsiteOrder } from 'src/app/features/management/manage-orders/onsite-orders/onsite-orders-service/model/onsite-order-interface';
import { SnackbarService } from 'src/app/templates/snackbar/snackbar-service/snackbar.service';
import { MessageStatus } from 'src/app/templates/snackbar/snackbar.template.component';
import { environment } from 'src/environments/environment';
import { KhaltiPaymentForBackendPayload } from '../model/user-payment.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { HttpClient } from '@angular/common/http';
import { timepickerReducer } from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';

@Injectable({
  providedIn: 'root'
})
export class KhaltiCheckoutService implements OnInit, OnDestroy {
  paymentSuccess$ = new BehaviorSubject<any>(false);
  closing$: Subject<boolean> = new Subject<boolean>();
  publicKey = environment.publicKey
  backendUrl = environment.apiUrl
  moduleName = "khalti"
  verifyInBackendSubscription$ !: Subscription
  constructor(private snackService: SnackbarService, private httpClient: HttpClient) { }

  ngOnInit(): void {
      
  }



  initCheckout(order: onsiteOrder): void {
    const config = {
      // replace this key with yours
      "publicKey": this.publicKey,
      "productIdentity": `Order made by ${order.fullName}`,
      "productName": `Order made on ${order.date}`,
      "productUrl": environment.frontUrl,
      "eventHandler": {
        onSuccess: (payload: any) => {
          // hit merchant api for initiating verification
          const backendPayload : KhaltiPaymentForBackendPayload = {
            amount : payload.amount,
            token: payload.token,
            onsiteOrderId : order.id
          }
          
         this.verifyInBackendSubscription$ = this.verificationInBackend(backendPayload).subscribe(
            (res) => {
              this.paymentSuccess$.next(payload);
              this.verifyInBackendSubscription$.unsubscribe()
            }
          )
          console.log(payload)
        },
        // onError handler is optional
        onError: (error: any) => {
          // handle errors
          this.snackService.showMessage({
            label: error,
            status: MessageStatus.FAIL
        });
        },
        onClose: () => {
        }
      },
      "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: order.remainingAmount * 100 });
  }

  verificationInBackend(payload : KhaltiPaymentForBackendPayload){
    return this.httpClient.post<ResponseData<PaginatedData<null>>>(`${this.backendUrl}${this.moduleName}/verify`, payload);
 }

 ngOnDestroy(): void {
     if(this.verifyInBackendSubscription$){
      this.verifyInBackendSubscription$.unsubscribe()
     }
 }
}
