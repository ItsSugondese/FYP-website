import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { UserService } from '@shared/service/user-service/user.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/_auth/auth-service/auth.service';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { UserNavConstant } from 'src/app/constant/navbar/usernav-data.model';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';
import { User } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/user.model';
import { UserProfileService } from 'src/app/shared/service/user-profile-service/user-profile.service';
import { SidenavService } from '../sidenav/sidenav-service/sidenav.service';
import { ManageOrdersNavbarService, OrderNav } from 'src/app/features/management/manage-orders/manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';

enum HeaderNav{
  HOMEPAGE = "Homepage",
   ORDER= "My Orders", 
}



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends CommonVariable implements OnInit {

  orderUrl : string =`/${ManagementRouteConstant.orderManagement}`
  allowedUrl : string[] = [this.orderUrl]
  navList = UserNavConstant
  inspecting = HeaderNav
  options: EnumItem[] = this.enumToEnumItems(HeaderNav);
  manageOrderOptions: EnumItem[] = this.enumToEnumItems(OrderNav)
  selectedNavbar = HeaderNav.HOMEPAGE
  userSubscription$ !: Observable<ResponseData<User>>

  constructor(private userProfileService: UserProfileService, public userService: UserService,
    public router: Router, public sidenavService: SidenavService, public managementNavbarService: ManageOrdersNavbarService){
super()
  }
  ngOnInit(): void{
    this.userSubscription$ = this.userProfileService.getUserProfile()

  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as HeaderNav;
  }
  
  updateSelectedOrderNavbar(value: string) {
    this.managementNavbarService.selectedNavbar = value as OrderNav;
  }
}
