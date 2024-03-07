import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { AnnouncementPayload } from './model/announcement-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends ServiceCommonVariable {

  moduleName = "announcement"
  backendUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { 
    super()
  }

  postAnnouncement(payload: AnnouncementPayload){
    this.loading = true;
    return this.httpClient.post<ResponseData<null>>(`${this.backendUrl}${this.moduleName}`, payload)
    .pipe(
      this.handleError()
    )
  }
}
