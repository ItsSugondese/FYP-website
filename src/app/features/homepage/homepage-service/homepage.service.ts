import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { onlineOrderPayload } from 'src/app/payload.interface';
import { environment } from 'src/environments/environment';
import { onlineOrder } from '../../management/manage-orders/online-orders/online-orders-service/model/online-order-interface';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  backendUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getFoodMenu(){
    return this.httpClient.get<any>(this.backendUrl + "food-menu" + "?type=TODAY");
 }

 postOnlineOrder(onlineOrderPayload : onlineOrderPayload){
  return this.httpClient.post<ResponseData<onlineOrder>>(this.backendUrl + "online-order", onlineOrderPayload);
 }
}
