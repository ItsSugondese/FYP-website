import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ManageUserBodyService } from './manage-user-body-service/manage-user-body.service';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { User } from './manage-users/manage-users-service/model/user.model';

@Component({
  selector: 'app-manage-user-body',
  templateUrl: './manage-user-body.component.html',
  styleUrls: ['./manage-user-body.component.scss']
})
export class ManageUserBodyComponent implements OnInit, OnDestroy{
  
  userId !: number | null
  isInspecting : boolean = true;
  inspectSubscription$ !: Observable<boolean>
  constructor(private manageUserBodySerivce: ManageUserBodyService){}
  
  ngOnInit(): void {
    this.inspectSubscription$ = this.manageUserBodySerivce.getInspect()
  }
  
  
  getUserId(event: number){
    this.userId = event
  }

  ngOnDestroy(): void {
    this.manageUserBodySerivce.setInspect(false)
  }
}
