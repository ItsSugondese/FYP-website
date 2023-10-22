import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { jwtResponse } from 'src/app/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  private path = environment.apiUrl
  constructor(private httpClient : HttpClient) { }

  public formHeader = {
    status: "Login",
    color: "black"
  };

  ngOnInit(): void {

  }

 requestHeaders = new HttpHeaders(
  {"No-Auth" : "True"}
 ) ;

 LoginWithGoogle(credentials: string): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.httpClient.post(this.path + "auth/login-with-google", JSON.stringify(credentials), { headers: header, withCredentials: true });
}


  login(userEmail : string, userPassword : string){
    const data = { userEmail, userPassword };
    return this.httpClient.post<jwtResponse>(this.path + "authenticate", data, {headers : this.requestHeaders});
  }

  public setFormHeader(status: string, color: string){
    this.formHeader = {
      status: status,
    color: color
    }
  }
}