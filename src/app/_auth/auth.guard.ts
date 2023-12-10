import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/service/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private userService : UserService,
    private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  
    if(this.userService.getToken() != null){
      const roles = route.data['roles'] as [];

      if(roles){
        const match = this.userService.roleMatch(roles)

        if(match){
          return true;
        }else{
          this.router.navigate(['/forbidden'])
          return false;
        }
      }
    }
    this.router.navigate(['/login'])
    return false;
  
  }
  
}