import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { disableUser } from './model/people-payload.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  backendUrl = environment.apiUrl;
  moduleName = "user"
  constructor(private httpClient : HttpClient) { }

  getSingleUser(id : Number){
    return this.httpClient.get<any>(this.backendUrl + this.moduleName + "/" + id);
 }

 disableUser(payload : disableUser) {
  // Replace 'your_api_endpoint_here' with the actual URL of your Spring Boot API
  return this.httpClient.post<any>(this.backendUrl  +"user/disable", payload);
}
}
