import { Injectable } from '@angular/core';
import { role } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setRoles(roles : role[]){
    
  localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles() : []{
    
    return JSON.parse(localStorage.getItem('roles') || '{}');
  }

  public setToken(token : string){
    localStorage.setItem("token", token);
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public setUsername(username : string){
    localStorage.setItem("username", username);
  }

  public getUsername(){
   return localStorage.getItem("username");
  }



  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }


  public roleMatch(allowedRoles : string[]) : boolean {

    
    const roles = this.getRoles();

    
  
    if(roles!=null && roles){
    for(let i=0; i<roles.length; i++){

      for(let j=0; j<allowedRoles.length; j++){

        if(roles[i] == allowedRoles[j]){

          return true;
        }
      }
    }
  }
  return false;
  }
}