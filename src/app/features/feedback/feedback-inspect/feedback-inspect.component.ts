import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-feedback-inspect',
  templateUrl: './feedback-inspect.component.html',
  styleUrls: ['./feedback-inspect.component.scss']
})
export class FeedbackInspectComponent {

  // @Input() foodId !: Number;
  @Input() foodId: Number = 2;
  paginatedData !: PaginatedData<Feedback>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson: FeedbackPagination = {
    page: 1,
    row: 10,
    foodId: this.foodId
  }
  fromTime = new Date();
  getFeedbackSubscriable$ !: Subscription
  getStatusSubscriable$ !: Subscription
  getStatisticsSubscriable$ !: Subscription
  tableSizes = [5, 10, 15, 20]
  feedbackStatusList !: string[]

  rangeDates !: Date[]

  feedbackData !: FeedbackStatistics
  statisticsPayload: FeedbackStatisticsPayload = {}

  constructor(private feedbackService: FeedbackService, private enumService: EnumService,
    private feedbackInspectService: FeedbackInspectService,) {

  }

  onRangeSelect(event: any) {

    console.log("size of date is " + this.rangeDates.length)
    if (this.rangeDates.length == 2 && this.rangeDates[1] != null) {
      console.log("here")
      const fromDate = this.rangeDates[0];
      const toDate = this.rangeDates[this.rangeDates.length - 1];

      const fromDateString = fromDate.getFullYear() + '-' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '-' + ('0' + fromDate.getDate()).slice(-2);
      const toDateString = toDate.getFullYear() + '-' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '-' + ('0' + toDate.getDate()).slice(-2);

      this.statisticsPayload.fromDate = fromDateString
      this.statisticsPayload.toDate = toDateString
      // console.log('From Date: ', fromDateString);
      // console.log('To Date: ', toDateString);
    }
  }

  ngOnInit(): void {
    this.getStatusSubscriable$ = this.enumService.getFeedbackStauts().subscribe(
      (response) => {
        this.feedbackStatusList = response.data
      }
    )

    this.getStatisticsSubscriable$ = this.feedbackInspectService.getFeedbackStatistics({}).subscribe(
      (response) => {
        this.feedbackData = response.data
      }
    )
  }



  getPaginatedData(foodId: Number, page: number, row: number) {
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
