import { paginationPayload } from "src/app/shared/model/pagination/pagination.model";

export interface FeedbackPayload{
  feedbackStatus: string; 
  foodId: number;
  feedbacks: string; 
  isAnonymous: boolean;
}


export interface FeedbackPagination extends paginationPayload{
  foodId : Number
}
