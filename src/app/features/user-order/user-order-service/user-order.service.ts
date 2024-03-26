import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { UserOrderHistory } from './model/user-order.model';
import { UserOrderHistoryPagination } from './model/user-order.payload';
import { orderedFood } from '../../management/manage-orders/order.model';
import { foodOrdering } from 'src/app/shared/model/order/food-order.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService extends ServiceCommonVariable {
  backendUrl = environment.apiUrl;
  moduleName = "user"
  constructor(private httpClient : HttpClient) {
    super()
   }

  orderMade !: UserOrderHistory

  getData(paginationRequest : UserOrderHistoryPagination){
    this.loading = true
    return this.httpClient.get<ResponseData<UserOrderHistory>>(this.backendUrl + "online-order/user-orders")
    .pipe(
      this.handleError()
    )
    ;
 }

 setOrderedFood(orderedFoods : UserOrderHistory){
  this.orderMade = orderedFoods;
 }

 getOrderedMade(){
  return this.orderMade;
 }
}
