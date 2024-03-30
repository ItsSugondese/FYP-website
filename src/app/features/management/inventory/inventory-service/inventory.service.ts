import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory, InventoryPaginationPayload } from './model/inventory-payload-model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends ServiceCommonVariable {

  backendUrl = environment.apiUrl;
  moduleName = "inventory"
  constructor(private httpClient : HttpClient) { 
    super()
  }

  postData(){

  }

  getInvnetoryData(paginationRequest : InventoryPaginationPayload){
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<Inventory>>>(`${this.backendUrl}${this.moduleName}/paginated`, paginationRequest)
     .pipe(
      this.handleError()
     );
  }
}
