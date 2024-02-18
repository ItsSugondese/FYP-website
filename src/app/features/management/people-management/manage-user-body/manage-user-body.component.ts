import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { User } from './manage-users/manage-users-service/model/user.model';

@Component({
  selector: 'app-manage-user-body',
  templateUrl: './manage-user-body.component.html',
  styleUrls: ['./manage-user-body.component.scss']
})
export class ManageUserBodyComponent implements OnInit, OnDestroy{
  
  user !: User | null
  isInspecting : boolean = false;
  constructor(){}
  
  ngOnInit(): void {
  }
  
  handleIsInspecting(event: boolean){
    this.isInspecting = event
  }
  
  getUserId(event: User){
    this.user = event
  }

  ngOnDestroy(): void {
    this.isInspecting = false
  }
}
