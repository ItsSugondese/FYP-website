import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentPayload, onsiteOrderPagination } from './model/onsite-orders-payload.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { onsiteOrder } from './model/onsite-order-interface';
import { ResponseData } from 'src/app/constant/data/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class OnsiteOrdersService {
  backendUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : onsiteOrderPagination){
     return this.httpClient.post<ResponseData<PaginatedData<onsiteOrder>>>(this.backendUrl + "onsite-order/paginated", paginationRequest);
  }
  postPayment(payload : PaymentPayload){
     return this.httpClient.post<ResponseData<PaginatedData<onsiteOrder>>>(this.backendUrl + "payment", payload);
  }
}
