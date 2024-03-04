import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { PaymentHistoryOfOrder, PaymentPayload, RemainingPaymentPayload } from './model/user-payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  moduleName = "payment"
  backendUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  postPayment(payload : PaymentPayload){
    return this.httpClient.post<ResponseData<PaginatedData<null>>>(this.backendUrl + this.moduleName, payload);
 }

  postRemainingPayment(payload : RemainingPaymentPayload){
    return this.httpClient.post<ResponseData<PaginatedData<null>>>(`${this.backendUrl}${this.moduleName}/pay-remaining`, payload);
 }
 
  getUserAmountToPay(id: number){
    return this.httpClient.get<ResponseData<number>>(`${this.backendUrl}${this.moduleName}/rem-amount/${id}`)
  }

  getUserPaymentHistory(id: number){
    return this.httpClient.get<ResponseData<PaymentHistoryOfOrder[]>>(`${this.backendUrl}${this.moduleName}/order-history/${id}`)
  }
}
