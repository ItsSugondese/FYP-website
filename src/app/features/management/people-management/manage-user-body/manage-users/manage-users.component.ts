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
  @Output() sendUserId : EventEmitter<User | null> = new EventEmitter()
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()
  @Output() onOpeningDrawer : EventEmitter<boolean> = new EventEmitter();

  paginationJson: manageUserPagination = {
    userType: ['USER', 'EXTERNAL_USER'],
    page: 1,
    row: 7
  }
  fromTime = new Date();
  getUsersSubscriable$ !: Subscription
  load = true
  imageId$ !: Subscription;
  imageDataMap: { [key: number]: string } = {};


  

  constructor(public manageUserService: ManageUsersService,) {
    super()
  }

  ngOnInit(): void {
    this.getPaginatedData();
  }

  selectedUserTypeToFilter(event: string | null){
    this.manageUserService.selectedOption = event!
    this.load = true
    
    
    this.getPaginatedData()
  }
  
  navigateToSingle(user: User) {
    this.sendUserId.emit(user);
    this.isInspectingEvent.emit(true)

  }

  getPaginatedData() {
    if(this.manageUserService.selectedOption == 'ALL'){
      this.paginationJson.userType = ['USER', 'EXTERNAL_USER']
    }else if(this.manageUserService.selectedOption == 'INTERNAL') {
      this.paginationJson.userType = ['USER']
    }else{
    this.paginationJson.userType = ['EXTERNAL_USER']
    }

    this.getUsersSubscriable$ = this.manageUserService.getData(
      this.paginationJson).subscribe(
        (response) => {
          this.userListPaginated = response.data
          this.load = false
          this.getUsersSubscriable$.unsubscribe()

          this.userListPaginated.content.forEach((user) => {
            if(user.profilePath && user.isExternal){
              this.imageId$ = this.manageUserService.getUserPicture(user.id).subscribe((imageBlob: Blob) => {
               
              this.createImageFromBlob(imageBlob, user.id)
               .then((imageData) => {
                this.imageDataMap[user.id] = imageData;
            })
          
            });
            }else if(!user.isExternal){
              this.imageDataMap[user.id] = user.profilePath
            }
  
          })
        }
      )
  }


  typedUserToFilter(event: string){
    if(event.trim() != ''){
      this.paginationJson.name = event
    }else{
      this.paginationJson.name = undefined
    }

    this.load = true;
    this.getPaginatedData()
  }

  onTableDataChange(event: any) {
    this.paginationJson.page = event
    this.getPaginatedData();
  }

  // onSelectedDropdown(event: any) {
  //   if (this.paginationJson.row != event) {
  //     this.paginationJson.row = event
  //     this.paginationJson.page = 1
  //     this.getPaginatedData();
  //   }
  // }


  ngOnDestroy(): void {
    if (this.getUsersSubscriable$) {
      this.getUsersSubscriable$.unsubscribe();
    }
  }

}
