import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { onlineOrderPayload } from 'src/app/payload.interface';
import { environment } from 'src/environments/environment';

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
  return this.httpClient.post<any>(this.backendUrl + "online-order", onlineOrderPayload);
 }
}
