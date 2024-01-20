import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {manageStaffPagination } from './model/manage-staff-payload.model';

@Injectable({
  providedIn: 'root'
})
export class ManageStaffService {

  backendUrl = environment.apiUrl;
  moduleName :string = "staff";
  constructor(private httpClient : HttpClient) { }

  postImage(data : FormData){
    return this.httpClient.post<any>(this.backendUrl + "temporary-attachments",data);
  }

  postStaffData(data : { [key: string]: any }){
    return this.httpClient.post<any>(this.backendUrl + this.moduleName, data);
  }

  getData(paginationRequest : manageStaffPagination){
    return this.httpClient.post<any>(this.backendUrl + this.moduleName + "/paginated", paginationRequest);
 }
  getSingleStaff(id : number){
    return this.httpClient.get<any>(this.backendUrl +  "user/" + id);
 }

 getStaffPicture(id: number) {
  // Replace 'your_api_endpoint_here' with the actual URL of your Spring Boot API
  return this.httpClient.get(this.backendUrl + this.moduleName +'/photo/' + id, { responseType: 'blob' });
}
 
}
