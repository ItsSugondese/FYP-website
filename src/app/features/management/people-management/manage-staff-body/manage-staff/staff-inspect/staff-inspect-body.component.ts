import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { UserProfileService } from '@shared/service/user-profile-service/user-profile.service';
import { Subscription } from 'rxjs';
import { User } from '../../../manage-user-body/manage-users/manage-users-service/model/user.model';
import { disableUser } from '../../../people-service/model/people-payload.model';
import { PeopleService } from '../../../people-service/people.service';
import { Staff } from '../manage-staff-service/model/staff.model';

enum StaffInspectNav{
  // DETAIL = "Basic Information",
   DISABLE = "Disable History"
}

@Component({
  selector: 'app-staff-inspect-body',
  templateUrl: './staff-inspect-body.component.html',
  styleUrls: ['./staff-inspect-body.component.scss']
})
export class StaffInspectBodyComponent extends CommonVariable implements OnInit, OnDestroy{
  
  @Input() staff !: Staff
  @Output() isInspectingEvent : EventEmitter<boolean> = new EventEmitter()
  inspecting = StaffInspectNav
  options: EnumItem[] = Object.keys(StaffInspectNav).map(key => ({ key, value: StaffInspectNav[key as keyof typeof StaffInspectNav] }));
  selectedNavbar = StaffInspectNav.DISABLE

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

  disableStaff(){
    this.visible = false;
    const disablePayload : disableUser = {
      isDisabled : this.staff.accountNonLocked ? true : false,
      userId : this.staff.id,
      remarks :  this.remarks
    }
    this.disableSend$ =  this.peopleService.disableUser(disablePayload).subscribe(
      (response) => {
        this.staff.accountNonLocked = !disablePayload.isDisabled
        this.staff = {...this.staff}
      }
    );
  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as StaffInspectNav;
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

