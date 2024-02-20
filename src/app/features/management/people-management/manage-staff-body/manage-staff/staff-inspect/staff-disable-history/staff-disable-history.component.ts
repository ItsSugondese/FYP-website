import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { disableUserHistoryPagination } from '../../../../people-service/model/people-payload.model';
import { DisableHistory } from '../../../../people-service/model/people.model';
import { PeopleService } from '../../../../people-service/people.service';
import { Staff } from '../../manage-staff-service/model/staff.model';

@Component({
  selector: 'app-staff-disable-history',
  templateUrl: './staff-disable-history.component.html',
  styleUrls: ['./staff-disable-history.component.scss']
})
export class StaffDisableHistoryComponent extends CommonVariable implements OnInit, OnDestroy, OnChanges{
  @Input() staff !: Staff
  disableHistoryPaginated !: PaginatedData<DisableHistory>
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: this.selectedRow,
  }
  paginationJson !: disableUserHistoryPagination 
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
      userId: this.staff.id
    }
    this.getPaginatedData()
  }

  handleEmittedEvent(event: Staff){
    this.staff = event
    this.getPaginatedData()
  }
  ngOnChanges(changes:  SimpleChanges) {
    if (changes.staff) {
      if (this.paginationJson != null) {
        this.getPaginatedData();
      }
    }
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
    this.paginationJson.page = event
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



// implements OnInit, OnDestroy{
//   id !: Number
//   disableHistoryList !: DisableHistory[]
//   paginationNavigator: defaultPaginationNavigator = {
//     currentPage: 1,
//     row: 10,
//   }
//   paginationJson !: disableUserHistoryPagination
//   fromTime = new Date();
//   getHistorySubscriable$ !: Subscription

//   tableSizes = [5, 10, 15, 20]

//   constructor(private peopleService: PeopleService, private router: ActivatedRoute) {

//   }
//   ngOnInit(): void {
    
//     this.router.params.subscribe(
//       (params) => {
//         this.id = params['id']
//         this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
//       }
//     );
//   }



//   getPaginatedData(page: number, row: number) {
//     this.getHistorySubscriable$ = this.peopleService.getDisableHistory(
//       this.setAndGetPaginationJson(page, row)).subscribe(
//         (response) => {
//           this.disableHistoryList = response.data.content
//           this.paginationNavigator.totalNoOfElements = response.data.totalElements
//           this.paginationNavigator.totalNoOfpage = response.data.totalPages
//           this.paginationNavigator.noOfElements = response.data.numberOfElements
//         }
//       )
//   }

//   setAndGetPaginationJson(page: number, row: number) {
//     return this.paginationJson = {
//       row: row,
//       page: page,
//       userId : this.id
//     }
//   }

//   onTableDataChange(event: any) {
//     this.paginationNavigator.currentPage = event
//     this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);

//   }

//   onEnterPress(event: any) {
//     if ((event.target.value).trim() !== '') {
//       this.paginationNavigator.row = event.target.value
//       this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
//     }
//     console.log(this.paginationNavigator.row)
//   }

//   ngOnDestroy(): void {
//     if(this.getHistorySubscriable$){
//       this.getHistorySubscriable$.unsubscribe();
//     }
//   }
// }
