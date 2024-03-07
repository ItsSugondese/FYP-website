import { Component, OnDestroy, OnInit } from '@angular/core';
import { Staff } from './manage-staff/manage-staff-service/model/staff.model';
import { ManageStaffService } from './manage-staff/manage-staff-service/manage-staff.service';

@Component({
  selector: 'app-manage-staff-body',
  templateUrl: './manage-staff-body.component.html',
  styleUrls: ['./manage-staff-body.component.scss']
})
export class ManageStaffBodyComponent implements OnInit, OnDestroy{
  
  staff !: Staff | null
  
  isOpenDrawer: boolean = false;
  constructor(public manageStaffService: ManageStaffService){}
  
  ngOnInit(): void {
  }
  

  onToggleDrawer(data: boolean){
    this.isOpenDrawer = data
  }
  handleIsInspecting(event: boolean){
    this.manageStaffService.isInspecting = event
  }
  
  getUserId(event: Staff){
    this.staff = event
  }

  ngOnDestroy(): void {
    this.manageStaffService.isInspecting = false
  }
}
