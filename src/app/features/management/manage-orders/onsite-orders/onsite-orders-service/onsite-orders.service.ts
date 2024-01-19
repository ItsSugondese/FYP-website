import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { onsiteOrderPagination } from './model/onsite-orders-payload.model';

@Injectable({
  providedIn: 'root'
})
export class OnsiteOrdersService {
  backendUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : onsiteOrderPagination){
     return this.httpClient.post<any>(this.backendUrl + "onsite-order/paginated", paginationRequest);
  }
}
