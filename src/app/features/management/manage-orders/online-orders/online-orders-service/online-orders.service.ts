import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { onlineOrderPagination } from './model/online-orders-payload.model';

@Injectable({
  providedIn: 'root'
})
export class OnlineOrdersService {
  backendUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : onlineOrderPagination){
     return this.httpClient.post<any>(this.backendUrl + "online-order/paginated", paginationRequest);
  }
}
