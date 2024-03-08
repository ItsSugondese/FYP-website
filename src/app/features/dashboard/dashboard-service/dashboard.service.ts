import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { SalesData, SalesDataPayload } from './model/sales-data.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  moduleName = "dashboard"
  backendUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { 
  }

  getSalesData(payload: SalesDataPayload){
    return this.httpClient.post<ResponseData<SalesData>>(`${this.backendUrl}admin/${this.moduleName}/sales-data`, payload)
  }
}
