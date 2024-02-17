import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { User } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  moduleName =  "user/profile"
  backendUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  getUserProfile(){
    return this.httpClient.get<ResponseData<User>>(this.backendUrl + this.moduleName);
  }

}
