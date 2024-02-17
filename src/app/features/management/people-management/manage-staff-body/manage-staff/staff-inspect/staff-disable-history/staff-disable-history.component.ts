import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { disableUserHistoryPagination } from '../../../../people-service/model/people-payload.model';
import { DisableHistory } from '../../../../people-service/model/people.model';
import { PeopleService } from '../../../../people-service/people.service';

@Component({
  selector: 'app-staff-disable-history',
  templateUrl: './staff-disable-history.component.html',
  styleUrls: ['./staff-disable-history.component.scss']
})
export class StaffDisableHistoryComponent implements OnInit, OnDestroy{
  id !: Number
  disableHistoryList !: DisableHistory[]
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson !: disableUserHistoryPagination
  fromTime = new Date();
  getHistorySubscriable$ !: Subscription

  tableSizes = [5, 10, 15, 20]

  constructor(private peopleService: PeopleService, private router: ActivatedRoute) {

  }
  ngOnInit(): void {
    
    this.router.params.subscribe(
      (params) => {
        this.id = params['id']
        this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
      }
    );
  }



  getPaginatedData(page: number, row: number) {
    this.getHistorySubscriable$ = this.peopleService.getDisableHistory(
      this.setAndGetPaginationJson(page, row)).subscribe(
        (response) => {
          this.disableHistoryList = response.data.content
          this.paginationNavigator.totalNoOfElements = response.data.totalElements
          this.paginationNavigator.totalNoOfpage = response.data.totalPages
          this.paginationNavigator.noOfElements = response.data.numberOfElements
        }
      )
  }

  setAndGetPaginationJson(page: number, row: number) {
    return this.paginationJson = {
      row: row,
      page: page,
      userId : this.id
    }
  }

  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);

  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
    }
    console.log(this.paginationNavigator.row)
  }

  ngOnDestroy(): void {
    if(this.getHistorySubscriable$){
      this.getHistorySubscriable$.unsubscribe();
    }
  }
}
