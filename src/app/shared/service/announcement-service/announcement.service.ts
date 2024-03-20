import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { AnnouncementPaginationPayload, AnnouncementPayload } from './model/announcement-payload.model';
import { catchError, finalize } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { Announcement } from './model/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends ServiceCommonVariable {

  moduleName = "announcement"
  backendUrl = environment.apiUrl

  announcementLoading : boolean = false;
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

  getAllAnnouncement(payload: AnnouncementPaginationPayload){
    this.announcementLoading = true;
    return this.httpClient.post<ResponseData<PaginatedData<Announcement>>>(`${this.backendUrl}${this.moduleName}/paginated`, payload)
    .pipe(
      catchError(error => {
        this.announcementLoading = false;
        throw error;
      }),
      finalize(() => this.announcementLoading = false)
    )
  }
}
