import { Component, OnDestroy, OnInit } from '@angular/core';
import { Staff } from './manage-staff/manage-staff-service/model/staff.model';

@Component({
  selector: 'app-manage-staff-body',
  templateUrl: './manage-staff-body.component.html',
  styleUrls: ['./manage-staff-body.component.scss']
})
export class ManageStaffBodyComponent implements OnInit, OnDestroy{
  
  staff !: Staff | null
  isInspecting : boolean = false;
  constructor(){}
  
  ngOnInit(): void {
  }
  
  handleIsInspecting(event: boolean){
    this.isInspecting = event
  }
  
  getUserId(event: Staff){
    this.staff = event
  }

  ngOnDestroy(): void {
    this.isInspecting = false
  }
}
