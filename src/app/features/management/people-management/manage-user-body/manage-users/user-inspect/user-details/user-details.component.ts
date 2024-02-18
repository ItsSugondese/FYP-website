import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { User } from '../../manage-users-service/model/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends CommonVariable implements OnInit, OnDestroy {

  @Input() user !: User;
  remarks !: string

  visible: boolean = false;


  constructor( ){
      super()
    }


  ngOnInit(): void {

 
  }




  ngOnDestroy(): void {
  }


}
