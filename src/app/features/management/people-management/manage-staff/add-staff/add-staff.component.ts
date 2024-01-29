import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageStaffService } from '../manage-staff-service/manage-staff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit, OnDestroy {
  staffForm !: FormGroup
  imageId$ !: Subscription;
  postStaffDetails$ !: Subscription
  imageId !: number;
  fileControl = new FormControl(null, Validators.required);
  constructor(private fb: FormBuilder, private staffService : ManageStaffService) {}
  
  ngOnInit() {
    this.staffForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      profileId : new FormControl()
    });
  }



  onFileSelected(event: any) {

    const files = event.target.files!;
    if (files && files.length > 0) {
      const formData = new FormData();
      const file = files[0];
      this.fileControl.setValue(file);
      formData.append('attachments', file);
      
      this.imageId$ = this.staffService.postImage(formData).subscribe(
        (response) => {
          this.staffForm.get("profileId")?.setValue(response.data[0]);
          this.imageId$.unsubscribe();
        }
        )
        
      }
    }
    
    
    onSubmit() {
      
      this.postStaffDetails$ = this.staffService.postStaffData(this.staffForm.value).subscribe(
        (results) => {
          console.log(results);
          this.postStaffDetails$.unsubscribe();
        }
        );
      }


      ngOnDestroy(): void {
        if(this.postStaffDetails$){
          this.postStaffDetails$.unsubscribe();
        }
      }
    }
    