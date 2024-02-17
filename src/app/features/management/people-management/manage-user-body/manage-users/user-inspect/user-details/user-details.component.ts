import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageUsersService } from '../../manage-users-service/manage-users.service';
import { User } from '../../manage-users-service/model/user.model';
import { disableUser } from '../../manage-users-service/model/maange-users-payload.model';
import { PeopleService } from '../../../../people-service/people.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  
  @Input() id!: number
  imageId$ !: Subscription;
  user !: User;
  userFetch$ !: Subscription;
  remarks !: string

  visible: boolean = false;

  disableSend$ !: Subscription


  constructor(private router: ActivatedRoute, private userService: ManageUsersService, 
    private peopleService: PeopleService, private navigateRouter: Router){}


  ngOnInit(): void {

    this.userFetch$ = this.peopleService.getSingleUser(this.id).subscribe(

      (response) => {
        this.user = response.data;
        }
    );
  }

  navigateToHistory(){
    this.navigateRouter.navigate(['/manage_users/' + this.id + '/history'])
  }

  disableUser(){
    const disablePayload : disableUser = {
      isDisabled : this.user.accountNonLocked ? true : false,
      userId : this.user.id,
      remarks :  this.remarks
    }
    this.disableSend$ =  this.peopleService.disableUser(disablePayload).subscribe();
  }

  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe();
    }
    if(this.userFetch$){
      this.userFetch$.unsubscribe();
    }
  }


}
