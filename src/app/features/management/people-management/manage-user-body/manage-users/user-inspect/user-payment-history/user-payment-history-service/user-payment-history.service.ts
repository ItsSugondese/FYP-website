import { Injectable } from '@angular/core';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';

enum PaymentFilter{
  ALL = "All",
  PAID = "Paid",
  UNPAID = "Unpaid",
  PARTIAL_PAID = "Partial Paid"
}
@Injectable({
  providedIn: 'root'
})
export class UserPaymentHistoryService extends ServiceCommonVariable{
  filters = PaymentFilter
  options: EnumItem[] = this.enumToEnumItems(PaymentFilter)
  selectedOption : string = Object.keys(PaymentFilter)[0]

  constructor() {
    super()
   }

   
}
