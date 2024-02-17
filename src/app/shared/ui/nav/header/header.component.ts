import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { User } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/user.model';
import { UserProfileService } from 'src/app/shared/service/user-profile-service/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSubscription$ !: Observable<ResponseData<User>>

  constructor(private userProfileService: UserProfileService){

  }
  ngOnInit(): void{
    // this.userSubscription$ = this.userProfileService.getUserProfile().subscribe(
    //   response => {
        
    //   }
    // )
    this.userSubscription$ = this.userProfileService.getUserProfile()
  }
}
