import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { manageUserPagination } from './manage-users-service/model/maange-users-payload.model';
import { Subscription } from 'rxjs';
import { ManageUsersService } from './manage-users-service/manage-users.service';
import { User } from './manage-users-service/model/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy{

  userList !: User[]
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 10,
  }
  paginationJson !: manageUserPagination
  fromTime = new Date();
  getOrderSubscriable$ !: Subscription

  tableSizes = [5, 10, 15, 20]

  constructor(private manageUserService : ManageUsersService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
  }

  navigateToSingle(id : Number){
    this.router.navigate(['/manage_users/', id])
  }

  getPaginatedData(page: number, row: number) {
    this.getOrderSubscriable$ = this.manageUserService.getData(
      this.setAndGetPaginationJson(page, row)).subscribe(
        (response) => {
          this.userList = response.data.content
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
    if(this.getOrderSubscriable$){
      this.getOrderSubscriable$.unsubscribe();
    }
  }
  
}
