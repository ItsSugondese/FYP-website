import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';

enum UserInspectNav{
  // DETAIL = "Basic Information",
   PAYMENT= "Payment History", 
   DISABLE = "Disable History"
}
@Injectable({
  providedIn: 'root'
})
export class UserInspectService extends ServiceCommonVariable {

  inspecting = UserInspectNav
  options: EnumItem[] = this.enumToEnumItems(UserInspectNav)
  selectedNavbar = UserInspectNav.PAYMENT

  constructor() { 
    super()
  }

  updateSelectedNavbar(value: string) {
    this.selectedNavbar = value as UserInspectNav;
  }
}
