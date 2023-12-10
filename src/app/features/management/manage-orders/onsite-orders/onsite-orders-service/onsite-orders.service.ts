import { Injectable } from '@angular/core';
import { orderPagination } from '../../order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnsiteOrdersService {
  backendUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : orderPagination){
     return this.httpClient.post<any>(this.backendUrl + "onsite-order/paginated", paginationRequest);
  }
}
