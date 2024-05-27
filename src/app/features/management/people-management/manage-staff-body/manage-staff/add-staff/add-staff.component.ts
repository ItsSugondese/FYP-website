import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ManageStaffService } from '../manage-staff-service/manage-staff.service';
import { Subscription } from 'rxjs';
import { Staff, StaffWithImageData } from '../manage-staff-service/model/staff.model';
import { createImageFromBlob } from '@shared/helper/attachment-helper/attachment.handler';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit, OnDestroy {
  @Input() staff !: Staff | null
  @Output() onOpeningDrawer: EventEmitter<boolean> = new EventEmitter();

  staffForm !: FormGroup
  postStaffDetails$ !: Subscription
  imageId !: number | null;
  imageUrl: string | null = null
  fileControl = new FormControl(null, Validators.required);
  imageId$ !: Subscription
  imageLoaded = false;
  constructor(private fb: FormBuilder, public staffService: ManageStaffService) { }

  ngOnInit() {

    this.staffForm = this.fb.group({
      id: new FormControl(),
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, this.contactNumberValidator()]],
      profileId: new FormControl()
    });

    if (this.staff != null) {
      this.imageId$ = this.staffService.getStaffPicture(this.staff.id).subscribe(
        (response) => {
          this.staffForm.setValue({
            id: this.staff?.id,
            fullName: this.staff?.fullName,
            email: this.staff?.email,
            contactNumber: this.staff?.contactNumber,
            profileId: null
          })




          createImageFromBlob(response, this.staff!.id)
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


    let formVal = this.staffForm.value;
formVal.userType = 'STAFF';

    this.postStaffDetails$ = this.staffService.postStaffData(formVal).subscribe(
      (results) => {
        this.postStaffDetails$.unsubscribe();
        window.location.reload()
      }
    );
  }


  compareFormAndStaff(): boolean {

    if (this.staff?.fullName == this.formValue('fullName')!.value &&
      this.staff?.contactNumber.toUpperCase() == this.formValue('contactNumber')!.value.toUpperCase() &&
      this.staff?.email.toUpperCase() == this.formValue('email')!.value.toUpperCase()) {
      return true;
    }

    return false;
  }

  formValue(name: string) {
    return this.staffForm.get(name);
  }

   contactNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const valid = /^9\d{9}$/.test(value);
      return valid ? null : { invalidContactNumber: true };
    };
  }


  ngOnDestroy(): void {
    if (this.postStaffDetails$) {
      this.postStaffDetails$.unsubscribe();
    }
  }
}
