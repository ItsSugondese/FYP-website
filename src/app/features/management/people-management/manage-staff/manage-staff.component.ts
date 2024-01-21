import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { manageStaffPagination } from './manage-staff-service/model/manage-staff-payload.model';
import { Staff } from './manage-staff-service/model/staff.model';
import { ManageStaffService } from './manage-staff-service/manage-staff.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit, OnDestroy {
  
  staffList !: Staff[]
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson !: manageStaffPagination
  fromTime = new Date();
  getStaffSubscriable$ !: Subscription

  tableSizes = [5, 10, 15, 20]

  constructor(private manageStaffService : ManageStaffService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
  }

  navigateToSingle(id : Number){
    this.router.navigate(['/admin/manage_staff/', id])
  }

  getPaginatedData(page: number, row: number) {
    this.getStaffSubscriable$ = this.manageStaffService.getData(
      this.setAndGetPaginationJson(page, row)).subscribe(
        (response) => {
          this.staffList = response.data.content
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
    if(this.getStaffSubscriable$){
      this.getStaffSubscriable$.unsubscribe();
    }
  }
}
