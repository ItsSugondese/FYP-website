import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { manageUserPagination } from './model/maange-users-payload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  backendUrl = environment.apiUrl;
  moduleName = "user"
  constructor(private httpClient : HttpClient) { }

  getData(paginationRequest : manageUserPagination){
     return this.httpClient.post<any>(this.backendUrl + this.moduleName + "/paginated", paginationRequest);
  }
  
}
