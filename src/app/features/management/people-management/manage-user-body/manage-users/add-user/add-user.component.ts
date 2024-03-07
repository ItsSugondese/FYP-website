import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../manage-users-service/model/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManageUsersService } from '../manage-users-service/manage-users.service';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { ManageStaffService } from '../../../manage-staff-body/manage-staff/manage-staff-service/manage-staff.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends CommonVariable{
  @Input() user !: User | null
  @Output() onOpeningDrawer: EventEmitter<boolean> = new EventEmitter();

  userForm !: FormGroup
  postStaffDetails$ !: Subscription
  imageId !: number | null;
  imageUrl: string | null = null
  fileControl = new FormControl(null, Validators.required);
  imageId$ !: Subscription
  imageLoaded = false;

  constructor(private fb: FormBuilder, public userService: ManageUsersService,
    public staffService: ManageStaffService) { 
    super()
  }

  ngOnInit() {

    this.userForm = this.fb.group({
      id: new FormControl(),
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileId: new FormControl()
    });

    if (this.user != null) {
      this.imageId$ = this.staffService.getStaffPicture(this.user.id).subscribe(
        (response) => {
          this.userForm.setValue({
            id: this.user?.id,
            fullName: this.user?.fullName,
            email: this.user?.email,
            profileId: null
          })




          this.createImageFromBlob(response, this.user!.id)
            .then((imageData) => {
              if (imageData.startsWith("data:image") || imageData.startsWith("data:text/xml")) {
                this.imageUrl = imageData;
              }
            })
          this.imageLoaded = true


        }
      )

    }
  }


  onSubmit() {
    if (this.imageId) {
      const photoIdControl = this.formValue('profileId');
      photoIdControl?.setValue(this.imageId);
    }


    let formVal = this.userForm.value;
formVal.userType = 'EXTERNAL_USER';

    this.postStaffDetails$ = this.staffService.postStaffData(formVal).subscribe(
      (results) => {
        this.postStaffDetails$.unsubscribe();
        window.location.reload()
      }
    );
  }


  compareFormAndStaff(): boolean {

    if (this.user?.fullName == this.formValue('fullName')!.value &&
      this.user?.email.toUpperCase() == this.formValue('email')!.value.toUpperCase()) {
      return true;
    }

    return false;
  }

  formValue(name: string) {
    return this.userForm.get(name);
  }


  ngOnDestroy(): void {
    if (this.postStaffDetails$) {
      this.postStaffDetails$.unsubscribe();
    }
  }

}
