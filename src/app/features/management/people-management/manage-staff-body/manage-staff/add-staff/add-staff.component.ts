import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageStaffService } from '../manage-staff-service/manage-staff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit, OnDestroy {
  @Output() onOpeningDrawer : EventEmitter<boolean> = new EventEmitter();

  staffForm !: FormGroup
  postStaffDetails$ !: Subscription
  imageId !: number | null;
  imageUrl !: string | null
  fileControl = new FormControl(null, Validators.required);

  constructor(private fb: FormBuilder, public staffService : ManageStaffService) {}
  
  ngOnInit() {
    this.staffForm = this.fb.group({
      id: new FormControl(),
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      profileId : new FormControl()
    });
  }


    onSubmit() {
      
      this.postStaffDetails$ = this.staffService.postStaffData(this.staffForm.value).subscribe(
        (results) => {
          console.log(results);
          this.postStaffDetails$.unsubscribe();
        }
        );
      }

      formValue(name: string) {
        return this.staffForm.get(name);
      }


      ngOnDestroy(): void {
        if(this.postStaffDetails$){
          this.postStaffDetails$.unsubscribe();
        }
      }
    }
    