import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { disableUser, disableUserHistoryPagination } from './model/people-payload.model';

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
  return this.httpClient.post<any>(this.backendUrl + this.moduleName +"/disable", payload);
}

getDisableHistory(paginationRequest : disableUserHistoryPagination){
  return this.httpClient.post<any>(this.backendUrl + this.moduleName + "/disable/pageable", paginationRequest);
}
}
