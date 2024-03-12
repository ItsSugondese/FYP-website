import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { Table } from './model/table.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ServiceCommonVariable{

  backendUrl : string = environment.apiUrl
  moduleName : string = "table"
  qrLoading : boolean = false
  constructor(private httpClient: HttpClient) {
    super()
   }

  getAllTables(){
    return this.httpClient.get<ResponseData<Table[]>>(`${this.backendUrl}${this.moduleName}`)
  }

  getQr(id: number){
    this.qrLoading = true
    return this.httpClient.get(`${this.backendUrl}${this.moduleName}/qr/${id}`, { responseType: 'blob' })
    .pipe(
      catchError(error => {
        this.qrLoading = false;
        throw error;
      }),
      finalize(() => this.qrLoading = false)
    );
  }
}
