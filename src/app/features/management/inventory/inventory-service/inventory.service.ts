import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory, InventoryLogPayload, InventoryMenuLog, InventoryPaginationPayload, InventoryPayload } from './model/inventory-payload-model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends ServiceCommonVariable {

  backendUrl = environment.apiUrl;
  moduleName = "inventory"
  constructor(private httpClient : HttpClient) { 
    super()
  }

  posting: boolean = false;
  deleting: boolean = false;
  logLoading = false;

  postData(payload: InventoryPayload){
    this.posting = true;
    return this.httpClient.post<ResponseData<null>>(`${this.backendUrl}${this.moduleName}`, payload)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => this.posting = false)
    )
  }
  deleteInventoryLog(id : number){
    this.deleting = true;
    return this.httpClient.delete<ResponseData<null>>(`${this.backendUrl}${this.moduleName}/${id}`)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => this.deleting = false)
    )
  }

  getFoodMenuInvnetoryLog(paginationRequest : InventoryLogPayload){
    this.logLoading = true
     return this.httpClient.post<ResponseData<PaginatedData<InventoryMenuLog>>>(`${this.backendUrl}${this.moduleName}/food-menu/paginated`, paginationRequest)
     .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => this.logLoading = false)
    
     );
  }

  getInvnetoryData(paginationRequest : InventoryPaginationPayload){
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<Inventory>>>(`${this.backendUrl}${this.moduleName}/paginated`, paginationRequest)
     .pipe(
      this.handleError()
     );
  }
}
