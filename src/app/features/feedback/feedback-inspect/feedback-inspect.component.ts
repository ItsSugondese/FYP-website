import { Component } from '@angular/core';
import { Staff } from '../../management/people-management/manage-staff/manage-staff-service/model/staff.model';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { manageStaffPagination } from '../../management/people-management/manage-staff/manage-staff-service/model/manage-staff-payload.model';
import { ManageStaffService } from '../../management/people-management/manage-staff/manage-staff-service/manage-staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { Feedback } from '../feedback-service/model/feedback.model';
import { FeedbackService } from '../feedback-service/feedback.service';
import { FeedbackPagination } from '../feedback-service/model/feedback.payload.model';

@Component({
  selector: 'app-feedback-inspect',
  templateUrl: './feedback-inspect.component.html',
  styleUrls: ['./feedback-inspect.component.scss']
})
export class FeedbackInspectComponent {

  foodId !: Number;
  paginatedData !: ResponseData<PaginatedData<Feedback>>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson !: FeedbackPagination
  fromTime = new Date();
  getStaffSubscriable$ !: Subscription

  tableSizes = [5, 10, 15, 20]

  constructor(private feedbackService : FeedbackService, private router: ActivatedRoute) {

  }
  
  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => {
        this.foodId = params['id'];
        this.getPaginatedData(this.foodId, this.paginationNavigator.currentPage, this.paginationNavigator.row);
      }
    );
  }

 

  getPaginatedData(foodId: Number,page: number, row: number) {
    this.getStaffSubscriable$ = this.feedbackService.getData(
      this.setAndGetPaginationJson(foodId, page, row)).subscribe(
        (response) => {
          this.paginatedData = response
        }
      )

      
  }

  setAndGetPaginationJson(foodId: Number, page: number, row: number) {
    return this.paginationJson = {
      foodId : foodId,
      row: row,
      page: page,
    }
  }

  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.getPaginatedData(this.foodId, this.paginationNavigator.currentPage, this.paginationNavigator.row);

  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      this.getPaginatedData(this.foodId, this.paginationNavigator.currentPage, this.paginationNavigator.row);
    }
    console.log(this.paginationNavigator.row)
  }

  ngOnDestroy(): void {
    if(this.getStaffSubscriable$){
      this.getStaffSubscriable$.unsubscribe();
    }
  }
}
