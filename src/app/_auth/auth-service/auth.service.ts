import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ValidateToken } from './model/forgot-password.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { ServiceCommonVariable } from '@shared/helper/inherit/common-variable-serivce';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceCommonVariable{

  private loginStatus = new BehaviorSubject<boolean>(this.loggedIn())
  private username = new BehaviorSubject<string>(localStorage.getItem('username')!)
  private path = environment.apiUrl
  moduleName: string = "auth"

  constructor(private httpClient: HttpClient) {
    super()
   }

  validatePasswordToken(data: ValidateToken){
    this.loading = true
    return this.httpClient.post<ResponseData<string>>(this.path + this.moduleName + "/validate-token", data)
    .pipe(
      this.handleError()
    )
  }

  // validatePasswordToken(data: ValidateToken){
  //   this.loading = true
  //   return this.httpClient.post<ResponseData<string>>(this.path + this.moduleName + "/validate-token", data)
  //   .pipe(
  //     this.handleError()
  //   )
  // }



  public signOutExternal = () => {
      localStorage.removeItem("token");
      console.log("token deleted")
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "auth/login-with-google", JSON.stringify(credentials), { headers: header, withCredentials: true });
  }

  

  login(loginModel:any): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.post(this.path + 'Login', JSON.stringify(loginModel), { headers: header, withCredentials: true })
  }





  saveToken(token:string) {
    localStorage.setItem('token', token)
  }

  saveUsername(username:string) {
    localStorage.setItem('username', username)
  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setLoginStatus(val:any) {
    this.loginStatus.next(val)
  }

  setUsername(val:any) {
    this.username.next(val)
  }


}