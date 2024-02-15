import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { FeedbackService } from '../feedback-service/feedback.service';
import { Feedback } from '../feedback-service/model/feedback.model';
import { FeedbackPagination } from '../feedback-service/model/feedback.payload.model';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';
import { FeedbackStatistics } from './feedback-inspect-service/model/feedback-inspect.model';
import { FeedbackInspectService } from './feedback-inspect-service/feedback-inspect.service';
import { data } from 'jquery';
import { FeedbackStatisticsPayload } from './feedback-inspect-service/model/feedback-inspect.payload';
import { Calendar } from 'primeng/calendar';
import { CalenderType } from 'src/app/templates/calender/calender.template.componenet';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';

@Component({
  selector: 'app-feedback-inspect',
  templateUrl: './feedback-inspect.component.html',
  styleUrls: ['./feedback-inspect.component.scss']
})
export class FeedbackInspectComponent extends CommonVariable {
  @Input() foodId !: number ;


  enumCalenderType = CalenderType

  paginatedData !: PaginatedData<Feedback>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson !: FeedbackPagination 
  fromTime = new Date();
  getFeedbackSubscriable$ !: Subscription
  getStatusSubscriable$ !: Subscription
  getStatisticsSubscriable$ !: Subscription
  tableSizes = [5, 10, 15, 20]
  feedbackStatusList !: string[]

  // rangeDates !: any
  rangeDates : Date[] = []
  placing : string = "Today"

  feedbackData !: FeedbackStatistics
  statisticsPayload: FeedbackStatisticsPayload = {
    foodId : this.foodId
  }
  minDateValue = new Date();


  constructor(private feedbackService: FeedbackService, private enumService: EnumService,
    public feedbackInspectService: FeedbackInspectService,) {
      super()
  }

 
  onRangeSelect(event: Date[]) {
    console.log("selected")
      this.rangeDates = event
      const fromDate = this.rangeDates[0];
      const toDate = this.rangeDates[this.rangeDates.length - 1];

      const fromDateString = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
      const toDateString = toDate.getFullYear() + '-' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '-' + ('0' + toDate.getDate()).slice(-2);

      this.setAndCallFeedback(fromDateString, toDateString)
      this.setAndCallFeedbackStatisctic(fromDateString, toDateString)
     
  }

  ngOnInit(): void {
    this.paginationJson = {
      page: 1,
      row: 10,
      foodId: this.foodId
    }

    this.statisticsPayload = {
      foodId : this.foodId
    }

    this.rangeDates[0] =new Date(2024, 0, 1);
    this.rangeDates[1] = new Date(2024, 0, 31);
    const fromDate = this.rangeDates[0];
      const toDate = this.rangeDates[this.rangeDates.length - 1];

      const fromDateString = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
      const toDateString = toDate.getFullYear() + '-' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '-' + ('0' + toDate.getDate()).slice(-2);
    this.setAndCallFeedbackStatisctic(fromDateString, toDateString)
    this.setAndCallFeedback(fromDateString, toDateString)
    this.getFeedbackStatus();
    // this.getFeedbackStatistics();
    // this.getPaginatedData();

  }


  setAndCallFeedback(fromDate: string, toDate: string){
    this.paginationJson.fromDate = fromDate;
    this.paginationJson.toDate = toDate;

    this.getPaginatedData();
  }
  setAndCallFeedbackStatisctic(fromDate: string, toDate: string){
    this.statisticsPayload.fromDate = fromDate;
    this.statisticsPayload.toDate = toDate;

    this.getFeedbackStatistics();
  }


  private getFeedbackStatistics() {
    this.getStatisticsSubscriable$ = this.feedbackInspectService.getFeedbackStatistics(this.statisticsPayload).subscribe(
      (response) => {
        this.feedbackData = response.data;
      }
    );
  }

  private getFeedbackStatus() {
    this.getStatusSubscriable$ = this.enumService.getFeedbackStauts().subscribe(
      (response) => {
        this.feedbackStatusList = response.data;
      }
    );
  }

  getPaginatedData() {
    this.getFeedbackSubscriable$ = this.feedbackService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.paginatedData = response.data
        }
      )


  }



  filterFeedbackDataByIndex(key: string, index: number): any {
    if (key.toLocaleLowerCase() == "width".toLocaleLowerCase()) {
      if (index === 0) {
        return this.feedbackData.positivePercentage
      } else if (index === 1) {
        return this.feedbackData.neutralPercentage
        // }else if(index === 3){
      } else {
        return this.feedbackData.negativePercentage
      }
    }
    if (key.toLocaleLowerCase() == "count".toLocaleLowerCase()) {
      if (index === 0) {
        return this.feedbackData.positiveCount
      } else if (index === 1) {
        return this.feedbackData.neutralCount
        // }else if(index === 3){
      } else {
        return this.feedbackData.negativeCount
      }
    }
  }

  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.getPaginatedData();

  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      this.getPaginatedData();
    }
    console.log(this.paginationNavigator.row)
  }

  ngOnDestroy(): void {
    if (this.getFeedbackSubscriable$) {
      this.getFeedbackSubscriable$.unsubscribe();
    }
    if (this.getStatusSubscriable$) {
      this.getStatusSubscriable$.unsubscribe();
    }
    if (this.getStatisticsSubscriable$) {
      this.getStatisticsSubscriable$.unsubscribe();
    }
  }


}
