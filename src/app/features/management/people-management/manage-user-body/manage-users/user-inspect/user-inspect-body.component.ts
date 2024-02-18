import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EnumItem } from 'src/app/shared/model/enums/MapForEnum.model';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';
import { User } from '../manage-users-service/model/user.model';
import { UserProfileService } from '@shared/service/user-profile-service/user-profile.service';
import { Subscription } from 'rxjs';
import { disableUser } from '../manage-users-service/model/maange-users-payload.model';
import { PeopleService } from '../../../people-service/people.service';

enum UserInspectNav{
  DETAIL = "Basic Information",
   PAYMENT= "Payment History", 
   DISABLE = "Disable History"
}
@Component({
  selector: 'app-user-inspect-body',
  templateUrl: './user-inspect-body.component.html',
  styleUrls: ['./user-inspect-body.component.scss']
})
export class UserInspectBodyComponent extends CommonVariable implements OnInit, OnDestroy{
  
  @Input() user !: User
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()
  inspecting = UserInspectNav
  options: EnumItem[] = Object.keys(UserInspectNav).map(key => ({ key, value: UserInspectNav[key as keyof typeof UserInspectNav] }));
  selectedNavbar = UserInspectNav.DETAIL

  remarks !: string

  visible: boolean = false;

  tempProfileSubscription !: Subscription
  disableSend$ !: Subscription

  constructor( userProfileService: UserProfileService,
    private peopleService: PeopleService){
    super()
    // this.tempProfileSubscription = userProfileService.getUserProfile().subscribe(
    //   (res) => {
    //     this.user = res.data
    //   }
    // )
  }
 
  ngOnInit(): void {

  }

  disableUser(){
    this.visible = false;
    const disablePayload : disableUser = {
      isDisabled : this.user.accountNonLocked ? true : false,
      userId : this.user.id,
      remarks :  this.remarks
    }
    this.disableSend$ =  this.peopleService.disableUser(disablePayload).subscribe(
      (response) => {
        this.user.accountNonLocked = !disablePayload.isDisabled
        this.user = {...this.user}
      }
    );
  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as UserInspectNav;
  }

  goBack(){
    this.isInspectingEvent.emit(false)
  }

  ngOnDestroy(): void {
    if(this.disableSend$){
      this.disableSend$.unsubscribe()
    }
    
  }

  
}
