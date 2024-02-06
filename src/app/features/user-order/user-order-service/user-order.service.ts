import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { UserOrderHistory } from './model/user-order.model';
import { UserOrderHistoryPagination } from './model/user-order.payload';
import { orderedFood } from '../../management/manage-orders/order.model';
import { foodOrdering } from 'src/app/shared/model/order/food-order.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  backendUrl = environment.apiUrl;
  moduleName = "user"
  constructor(private httpClient : HttpClient) { }

  orderMade !: UserOrderHistory
  getData(paginationRequest : UserOrderHistoryPagination){
    return this.httpClient.post<ResponseData<PaginatedData<UserOrderHistory>>>(this.backendUrl + "onsite-order/history/paginated", paginationRequest);
 }

 setOrderedFood(orderedFoods : UserOrderHistory){
  this.orderMade = orderedFoods;
 }

 getOrderedMade(){
  return this.orderMade;
 }
}
