import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { ManageStaffService } from '../../manage-staff-service/manage-staff.service';
import { Staff } from '../../manage-staff-service/model/staff.model';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent extends CommonVariable implements OnInit, OnDestroy {

  imageId$ !: Subscription;
  @Input() staff !: Staff;
  remarks !: string
  imageData : string | null = null;
  visible: boolean = false;


  constructor(public staffService: ManageStaffService ){
      super()
    }


  ngOnInit(): void {
      

            this.imageId$ = this.staffService.getStaffPicture(this.staff.id).subscribe((imageBlob: Blob) => {
              if(this.staff.profilePath){
            this.createImageFromBlob(imageBlob, this.staff.id)
             .then((imageData) => {
              this.imageData = imageData;
          })
        }
          });
       
 
  }




  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe()
    }
  }


}

// implements OnInit, OnDestroy{

//   id!: number
//   imageId$ !: Subscription;
//   staff !: Staff;
//   staffFetch$ !: Subscription;
//   staffPicture$ !: Subscription;
//   imageData !: string;
//   remarks !: string

//   visible: boolean = false;

//   disableSend$ !: Subscription
//   constructor(private router: ActivatedRoute, private staffService: ManageStaffService,
//     private peopleService : PeopleService, private navigateRouter: Router){}


//   ngOnInit(): void {
//     this.router.params.subscribe(
//       (params) => {
//         this.id = params['id']
//       }
//     );

//     this.staffFetch$ = this.staffService.getSingleStaff(this.id).subscribe(

//       (response) => {
//         this.staff = response.data;
       
//             this.staffPicture$ = this.staffService.getStaffPicture(this.staff.id).subscribe((imageBlob: Blob) => {


//             createImageFromBlob(imageBlob, this.staff.id)
//              .then((imageData) => {
//               this.imageData = imageData;
//           })
//           .catch((error) => {
//               console.log("error when trying to access")
//           });
//           });
//         }
//     );
//   }

//   disableStaff(){
//     const disablePayload : disableUser = {
//       isDisabled : this.staff.accountNonLocked ? true : false,
//       userId : this.staff.id,
//       remarks :  this.remarks
//     }
//     this.disableSend$ =  this.peopleService.disableUser(disablePayload).subscribe();
//   }

//   navigateToHistory(){
//     this.navigateRouter.navigate(['/manage_users/' + this.id + '/history'])
//   }


//   ngOnDestroy(): void {
//     if(this.imageId$){
//       this.imageId$.unsubscribe();
//     }
//     if(this.staffFetch$){
//       this.staffFetch$.unsubscribe();
//     }
//     if(this.staffPicture$){
//       this.staffPicture$.unsubscribe();
//     }

//     if(this.disableSend$){
//       this.disableSend$.unsubscribe();
//     }

//   }


// }
