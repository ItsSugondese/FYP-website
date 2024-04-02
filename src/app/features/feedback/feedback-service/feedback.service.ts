import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FeedbackPagination, FeedbackPayload } from './model/feedback.payload.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { Feedback } from './model/feedback.model';
import { FeedbackInspectService } from '../feedback-inspect/feedback-inspect-service/feedback-inspect.service';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends ServiceCommonVariable {

  moduleName = "feedback"
  backendUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient, private feedbackInspectService: FeedbackInspectService) {
    super()
   }

  postFeedbacks(feedbackPayload : FeedbackPayload){
    return this.httpClient.post<any>(this.backendUrl + this.moduleName, feedbackPayload);
   }

  getFeedbackStatus(){
    return this.httpClient.get<any>(this.backendUrl + "enums/" + this.moduleName);
   }

   getData(paginationRequest : FeedbackPagination){
    this.feedbackInspectService.loading = true;
    return this.httpClient.post<ResponseData<PaginatedData<Feedback>>>(this.backendUrl + this.moduleName + "/paginated", paginationRequest)
    .pipe(
      catchError(error => {
        this.feedbackInspectService.loading = false;
        throw error;
      }),
      finalize(() => this.feedbackInspectService.loading = false)

    );
 }
}
