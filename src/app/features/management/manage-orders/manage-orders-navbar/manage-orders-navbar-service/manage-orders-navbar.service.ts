import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';


export enum OrderNav{
  ONSITE = "Onsite",
  ONLINE = "Online"
}
@Injectable({
  providedIn: 'root'
})
export class ManageOrdersNavbarService extends ServiceCommonVariable {

  routes = ManagementRouteConstant;
  isOnsite = true;
  selectedNavbar = OrderNav.ONLINE
  inspecting = OrderNav
  options: EnumItem[] = this.enumToEnumItems(OrderNav);
  constructor() {
    super()
   }

  setSelectedNav(is: boolean){
    this.isOnsite = is;
  }
}
