import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  backendUrl = environment.apiUrl;
  moduleName = "enums"
  constructor(private httpClient : HttpClient) { }


  getFoodMenuData(){
    return this.httpClient.get<ResponseData<string[]>>(this.backendUrl + this.moduleName +  "/food-menu");
 }

  getFeedbackStauts(){
    return this.httpClient.get<ResponseData<string[]>>(this.backendUrl + this.moduleName +  "/feedbacks");
 }

}
