import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedbackStatistics } from './model/feedback-inspect.model';
import { FeedbackStatisticsPayload } from './model/feedback-inspect.payload';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackInspectService {

  backendUrl : string = environment.apiUrl
  loading = false;
  constructor(private httpClient: HttpClient) { }

  getFeedbackStatistics(data: FeedbackStatisticsPayload) {
    this.loading= true
    return this.httpClient.post<ResponseData<FeedbackStatistics>>(this.backendUrl + "feedback/data", data)
    .pipe(
      catchError(error => {
        // Handle error
        throw error;
      }),
      finalize(() => this.loading=false
      ));
  }
}
