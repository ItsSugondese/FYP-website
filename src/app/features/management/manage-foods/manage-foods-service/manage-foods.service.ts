import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodMenuPagination } from './model/food-menu.payload';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { foodMenu } from './model/food-menu.model';

@Injectable({
  providedIn: 'root'
})
export class ManageFoodsService {

  backendUrl = environment.apiUrl;
  moduleName : string = "food-menu"
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
  getFoodMenuPaginated(data : FoodMenuPagination){
     return this.httpClient.post<PaginatedData<foodMenu>>(this.backendUrl + this.moduleName +  "/pageable", data);
  }

  getFoodPicture(id: number) {
    // Replace 'your_api_endpoint_here' with the actual URL of your Spring Boot API
    return this.httpClient.get(this.backendUrl +'food-menu/photo/' + id, { responseType: 'blob' });
  }
 

}

