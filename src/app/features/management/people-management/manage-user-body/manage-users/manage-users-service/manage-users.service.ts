import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { manageUserPagination } from './model/maange-users-payload.model';
import { environment } from 'src/environments/environment';
import { ServiceCommonVariable } from 'src/app/shared/helper/inherit/common-variable-serivce';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { User } from './model/user.model';
import { Staff } from '../../../manage-staff-body/manage-staff/manage-staff-service/model/staff.model';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';

enum UserFilter{
  ALL = "All",
  INTERNAL = "Internal",
  EXTERNAL_USER = "External",
}

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService extends ServiceCommonVariable {
  backendUrl = environment.apiUrl;
  moduleName = "user"
  isInspecting : boolean = false;
  
  options: EnumItem[] = this.enumToEnumItems(UserFilter)
   selectedOption = Object.keys(UserFilter)[0]

  constructor(private httpClient : HttpClient) {
    super()
   }

  getData(paginationRequest : manageUserPagination){
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<User | Staff>>>(this.backendUrl + this.moduleName + "/paginated", paginationRequest)
     .pipe(
      this.handleError()
     );
  }

  handleIsInspecting(event: boolean){
    this.isInspecting = event
  }
  
  
  
  
}
