import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { Staff } from '../../manage-staff-service/model/staff.model';
import { ManageStaffService } from '../../manage-staff-service/manage-staff.service';
import { PeopleService } from '../../../people-service/people.service';
import { disableUser } from '../../../people-service/model/people-payload.model';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent implements OnInit, OnDestroy{

  id!: number
  imageId$ !: Subscription;
  staff !: Staff;
  staffFetch$ !: Subscription;
  staffPicture$ !: Subscription;
  imageData !: string;
  remarks !: string

  visible: boolean = false;

  disableSend$ !: Subscription

  constructor(private router: ActivatedRoute, private staffService: ManageStaffService,
    private peopleService : PeopleService, private navigateRouter: Router){}


  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => {
        this.id = params['id']
      }
    );

    this.staffFetch$ = this.staffService.getSingleStaff(this.id).subscribe(

      (response) => {
        this.staff = response.data;
       
            this.staffPicture$ = this.staffService.getStaffPicture(this.staff.id).subscribe((imageBlob: Blob) => {


            createImageFromBlob(imageBlob, this.staff.id)
             .then((imageData) => {
              this.imageData = imageData;
          })
          .catch((error) => {
              console.log("error when trying to access")
          });
          });
        }
    );
  }

  disableStaff(){
    const disablePayload : disableUser = {
      isDisabled : this.staff.accountNonLocked ? true : false,
      userId : this.staff.id,
      remarks :  this.remarks
    }
    this.disableSend$ =  this.peopleService.disableUser(disablePayload).subscribe();
  }

  navigateToHistory(){
    this.navigateRouter.navigate(['/manage_users/' + this.id + '/history'])
  }


  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe();
    }
    if(this.staffFetch$){
      this.staffFetch$.unsubscribe();
    }
    if(this.staffPicture$){
      this.staffPicture$.unsubscribe();
    }

    if(this.disableSend$){
      this.disableSend$.unsubscribe();
    }

  }


}
