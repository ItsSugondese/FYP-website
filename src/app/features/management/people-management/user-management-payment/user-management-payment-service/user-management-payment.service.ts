import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';


enum UserByPayFilter{
  ALL = "All",
  PAID = "Paid",
  UNPAID = "Unpaid",
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementPaymentService extends ServiceCommonVariable{

  options: EnumItem[] = this.enumToEnumItems(UserByPayFilter)
  selectedOption = Object.keys(UserByPayFilter)[0]

  constructor() { 
    super()
  }
}
