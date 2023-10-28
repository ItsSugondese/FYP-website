import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  postFoodMenu(data : FormGroup){
    return this.httpClient.post<any>(this.backendUrl + "food-menu",data.value);
  }
 

}
