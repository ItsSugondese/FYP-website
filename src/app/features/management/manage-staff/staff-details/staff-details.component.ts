import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Staff } from '../manage-staff-service/model/staff.model';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { ManageStaffService } from '../manage-staff-service/manage-staff.service';

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


  constructor(private router: ActivatedRoute, private staffService: ManageStaffService){}


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
  }


}
