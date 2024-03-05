import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OnsiteOrderOfUserPagination, onsiteOrderPagination } from './model/onsite-orders-payload.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { onsiteOrder } from './model/onsite-order-interface';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { catchError, finalize } from 'rxjs';

enum OnsiteOrderFilter{
  PENDING = "Pending",
  VIEWED = "Viewed",
  DELIVERED = "Delivered",
  PAID = "Paid",
  CANCELED = "Canceled"
}

@Injectable({
  providedIn: 'root'
})
export class OnsiteOrdersService extends ServiceCommonVariable {
  backendUrl = environment.apiUrl;
  moduleName = "onsite-order"
  updateOrderLoader : boolean = false
  onsiteFilterEnum = OnsiteOrderFilter
  constructor(private httpClient : HttpClient) {
    super()
   }

   options: EnumItem[] = this.enumToEnumItems(OnsiteOrderFilter)
   selectedOption = Object.keys(OnsiteOrderFilter)[0]

   public markingLoading = {
    status: false,
    index: -1
  } 

   
  getData(paginationRequest : onsiteOrderPagination){
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<onsiteOrder>>>(this.backendUrl + "onsite-order/paginated", paginationRequest)
     .pipe(
      this.handleError()
     );
  }

  getUserOnsiteDataData(paginationRequest : OnsiteOrderOfUserPagination){
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<onsiteOrder>>>(this.backendUrl + "onsite-order/by-user/paginated", paginationRequest)
     .pipe(
      this.handleError()
     );
  }

  markAsRead(id : number, i: number){
    this.markingLoading = {
      status: true,
      index: i
    }
     return this.httpClient.get<ResponseData<null>>(this.backendUrl + "onsite-order/mark-as-read/" + id)
     .pipe(
      catchError(error => {
              this.markingLoading.status = false;
              throw error;
            }),
            finalize(() => this.markingLoading.status = false)
     );
  }
  updateOrderStatus(id : number, status: string){
    this.updateOrderLoader = true
     return this.httpClient.get<ResponseData<null>>(`${this.backendUrl}${this.moduleName}/status/${id}/${status}`)
     .pipe(
      catchError(error => {
              this.updateOrderLoader = false;
              throw error;
            }),
            finalize(() => this.updateOrderLoader = false)
     );
  }
  
}
