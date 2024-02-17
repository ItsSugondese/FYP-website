import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { disableUser, disableUserHistoryPagination } from './model/people-payload.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { DisableHistory } from './model/people.model';
import { ServiceCommonVariable } from 'src/app/shared/helper/inherit/common-variable-serivce';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends ServiceCommonVariable{

  backendUrl = environment.apiUrl;
  moduleName = "user"
  constructor(private httpClient : HttpClient) { 
    super()
  }

  
  getSingleUser(id : Number){
    return this.httpClient.get<any>(this.backendUrl + this.moduleName + "/" + id);
 }

 disableUser(payload : disableUser) {
  return this.httpClient.post<any>(this.backendUrl + this.moduleName +"/disable", payload);
}

getDisableHistory(paginationRequest : disableUserHistoryPagination){
  this.loading = true;
  return this.httpClient.post<ResponseData<PaginatedData<DisableHistory>>>(this.backendUrl + this.moduleName + "/disable/pageable", paginationRequest)
  .pipe(
    this.handleError()
  );
}
}
