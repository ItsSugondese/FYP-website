import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { User } from './manage-users/manage-users-service/model/user.model';
import { ManageUsersService } from './manage-users/manage-users-service/manage-users.service';

@Component({
  selector: 'app-manage-user-body',
  templateUrl: './manage-user-body.component.html',
  styleUrls: ['./manage-user-body.component.scss']
})
export class ManageUserBodyComponent implements OnInit, OnDestroy{
  
  user !: User | null
  // user : User | null =  {
  //   email: "np05cp4a210083@iic.edu.np",
  //   profilePath: "https://lh3.googleusercontent.com/a/ACg8ocKP5zsjMss5bUl4ROhOIDYdOhHfORKXllTbL71hnXWS=s96-c",
  //   // contactNumber: null,
  //   id: 1,
  //   accountNonLocked: false,
  //   fullName: "Rohan Niraula",
  //   userType: 'USER'
  // }
  isInspecting : boolean = false;
  isOpenDrawer: boolean = false;
  constructor(public manageUserService: ManageUsersService){}
  
  ngOnInit(): void {
  }
  
  onToggleDrawer(data: boolean){
    this.isOpenDrawer = data
  }
  
  handleIsInspecting(event: boolean){
    this.manageUserService.isInspecting = event
  }
  
  getUserId(event: User){
    this.user = event
  }

  ngOnDestroy(): void {
    this.manageUserService.isInspecting = false
  }
}
