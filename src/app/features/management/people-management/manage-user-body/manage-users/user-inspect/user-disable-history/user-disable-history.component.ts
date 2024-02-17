import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { disableUserHistoryPagination } from '../../../../people-service/model/people-payload.model';
import { DisableHistory } from '../../../../people-service/model/people.model';
import { PeopleService } from '../../../../people-service/people.service';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';

@Component({
  selector: 'app-user-disable-history',
  templateUrl: './user-disable-history.component.html',
  styleUrls: ['./user-disable-history.component.scss']
})
export class UserDisableHistoryComponent extends CommonVariable implements OnInit, OnDestroy{
  // @Input() id !: number
  @Input() id : number  = 1
  disableHistoryPaginated !: PaginatedData<DisableHistory>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson : disableUserHistoryPagination = {
    page: 1,
    row: this.selectedRow,
    userId: this.id
  }
  fromTime = new Date();
  getHistorySubscriable$ !: Subscription

  shouldShowRemark : boolean = false;

  selectedHistory !: DisableHistory;


  constructor(public peopleService: PeopleService) {
super()
  }
  
  ngOnInit(): void {
    this.paginationJson = {
      page: 1,
      row: this.selectedRow,
      userId: 1
    }
    this.getPaginatedData()
  }


  showRemarks(history : DisableHistory){
    this.shouldShowRemark = true;
    this.selectedHistory = history;
  }

  getPaginatedData() {
    this.getHistorySubscriable$ = this.peopleService.getDisableHistory(
      this.paginationJson).subscribe(
        (response) => {
          this.disableHistoryPaginated = response.data
        }
      )
  }

  onSelectedDropdown(event: any) {
    if (this.paginationJson.row != event) {
      this.paginationJson.row = event
      this.getPaginatedData();
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
    if(this.getHistorySubscriable$){
      this.getHistorySubscriable$.unsubscribe();
    }
  }
}
