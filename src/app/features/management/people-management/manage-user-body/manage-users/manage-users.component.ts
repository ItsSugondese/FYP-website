import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { manageUserPagination } from './manage-users-service/model/maange-users-payload.model';
import { Subscription } from 'rxjs';
import { ManageUsersService } from './manage-users-service/manage-users.service';
import { User } from './manage-users-service/model/user.model';
import { Router } from '@angular/router';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends CommonVariable implements OnInit, OnDestroy {

  userListPaginated !: PaginatedData<User>
  @Output() sendUserId : EventEmitter<User> = new EventEmitter()
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()

  paginationJson: manageUserPagination = {
    userType: 'USER',
    page: 1,
    row: this.selectedRow
  }
  fromTime = new Date();
  getUsersSubscriable$ !: Subscription


  

  constructor(public manageUserService: ManageUsersService,) {
    super()
  }

  ngOnInit(): void {
    this.getPaginatedData();
  }

  navigateToSingle(user: User) {
    this.sendUserId.emit(user);
    this.isInspectingEvent.emit(true)

  }

  getPaginatedData() {
    this.getUsersSubscriable$ = this.manageUserService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.userListPaginated = response.data
          this.getUsersSubscriable$.unsubscribe()
        }
      )
  }


  typedUserToFilter(event: string){
    if(event.trim() != ''){
      this.paginationJson.name = event
    }else{
      this.paginationJson.name = undefined
    }
    this.getPaginatedData()
  }

  onTableDataChange(event: any) {
    this.paginationJson.page = event
    this.getPaginatedData();

  }

  onSelectedDropdown(event: any) {
    if (this.paginationJson.row != event) {
      this.paginationJson.row = event
      this.paginationJson.page = 1
      this.getPaginatedData();
    }
  }


  ngOnDestroy(): void {
    if (this.getUsersSubscriable$) {
      this.getUsersSubscriable$.unsubscribe();
    }
  }

}
