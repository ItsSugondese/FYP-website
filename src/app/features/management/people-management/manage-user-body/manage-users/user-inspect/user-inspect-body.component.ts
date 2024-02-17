import { Component, Input, OnInit } from '@angular/core';
import { EnumItem } from 'src/app/shared/model/enums/MapForEnum.model';
import { ManageUserBodyService } from '../../manage-user-body-service/manage-user-body.service';

enum UserInspectNav{
  DETAIL = "Basic Information",
   PAYMENT= "Payment History", 
   DISABLE = "Disable History"
}
@Component({
  selector: 'app-user-inspect-body',
  templateUrl: './user-inspect-body.component.html',
  styleUrls: ['./user-inspect-body.component.scss']
})
export class UserInspectBodyComponent implements OnInit{
  // @Input() userId !: number
  @Input() userId : number = 1
  inspecting = UserInspectNav
  options: EnumItem[] = Object.keys(UserInspectNav).map(key => ({ key, value: UserInspectNav[key as keyof typeof UserInspectNav] }));
  selectedNavbar = UserInspectNav.DISABLE

  constructor(private manageUserBodyService: ManageUserBodyService){}

  ngOnInit(): void {

  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as UserInspectNav;
  }

  goBack(){
    this.manageUserBodyService.setInspect(false)
  }
  
}
