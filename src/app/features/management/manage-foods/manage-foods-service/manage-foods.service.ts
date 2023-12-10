import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageFoodsService {

  backendUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  postImage(data : FormData){
    return this.httpClient.post<any>(this.backendUrl + "temporary-attachments",data);
  }

  postFoodMenu(data : { [key: string]: any }){
    return this.httpClient.post<any>(this.backendUrl + "food-menu",data);
  }

  getFoodMenu(){
     return this.httpClient.get<any>(this.backendUrl + "food-menu" + "?type=ALL");
  }

  getFoodPicture(id: number) {
    // Replace 'your_api_endpoint_here' with the actual URL of your Spring Boot API
    return this.httpClient.get(this.backendUrl +'food-menu/photo/' + id, { responseType: 'blob' });
  }
 

}
export interface foodMenu{
  id : number,
  name: string,
  description: string,
  cost: number,
  isPackage: boolean,
  photoId: number,
  isAvailableToday : boolean,
  menuItems : string[]
}
