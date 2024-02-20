import { Component, OnInit } from '@angular/core';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { Observable, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { UserNavConstant } from 'src/app/constant/navbar/usernav-data.model';
import { User } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/user.model';
import { UserProfileService } from 'src/app/shared/service/user-profile-service/user-profile.service';

enum HeaderNav{
  HOMEPAGE = "Homepage",
   ORDER= "My Orders", 
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navList = UserNavConstant
  inspecting = HeaderNav
  options: EnumItem[] = Object.keys(HeaderNav).map(key => ({ key, value: HeaderNav[key as keyof typeof HeaderNav] }));
  selectedNavbar = HeaderNav.HOMEPAGE
  userSubscription$ !: Observable<ResponseData<User>>

  constructor(private userProfileService: UserProfileService){

  }
  ngOnInit(): void{
    this.userSubscription$ = this.userProfileService.getUserProfile()
  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as HeaderNav;
  }
}
