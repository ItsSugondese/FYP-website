import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { manageUserPagination } from './manage-users-service/model/maange-users-payload.model';
import { Subscription } from 'rxjs';
import { ManageUsersService } from './manage-users-service/manage-users.service';
import { User } from './manage-users-service/model/user.model';
import { Router } from '@angular/router';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageUserBodyService } from '../manage-user-body-service/manage-user-body.service';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends CommonVariable implements OnInit, OnDestroy {

  userListPaginated !: PaginatedData<User>
  @Output() sendUserId : EventEmitter<number> = new EventEmitter()

  paginationJson: manageUserPagination = {
    userType: 'USER',
    page: 1,
    row: this.selectedRow
  }
  fromTime = new Date();
  getOrderSubscriable$ !: Subscription


  

  constructor(public manageUserService: ManageUsersService, private manageUserBodySerivce: ManageUserBodyService) {
    super()
  }

  ngOnInit(): void {
    this.getPaginatedData();
  }

  navigateToSingle(id: number) {
    this.sendUserId.emit(id);
    this.manageUserBodySerivce.setInspect(true)

  }

  getPaginatedData() {
    this.getOrderSubscriable$ = this.manageUserService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.userListPaginated = response.data
          this.getOrderSubscriable$.unsubscribe()
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
      this.getPaginatedData();
    }
  }


  ngOnDestroy(): void {
    if (this.getOrderSubscriable$) {
      this.getOrderSubscriable$.unsubscribe();
    }
  }

}
