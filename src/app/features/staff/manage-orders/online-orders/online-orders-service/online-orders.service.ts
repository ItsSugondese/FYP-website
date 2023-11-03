import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { onlineOrder, onlineOrderPagination } from '../online-order-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlineOrdersService {
  backendUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : onlineOrderPagination){
     return this.httpClient.post<any>(this.backendUrl + "online-order/get-order-paginated", paginationRequest);
  }
}
