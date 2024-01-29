import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FeedbackPagination, FeedbackPayload } from './model/feedback.payload.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { Feedback } from './model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  moduleName = "feedback"
  backendUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  postFeedbacks(feedbackPayload : FeedbackPayload){
    return this.httpClient.post<any>(this.backendUrl + this.moduleName, feedbackPayload);
   }

  getFeedbackStatus(){
    return this.httpClient.get<any>(this.backendUrl + "enums/" + this.moduleName);
   }

   getData(paginationRequest : FeedbackPagination){
    return this.httpClient.post<ResponseData<PaginatedData<Feedback>>>(this.backendUrl + this.moduleName + "/paginated", paginationRequest);
 }
}
