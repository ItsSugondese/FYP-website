import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserService } from "../shared/service/user-service/user.service";
import { LoginService } from "./registration/login/login-service/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

     token : string | null= this.userService.getToken();

     

    constructor(
        private userService : UserService, 
        private router : Router,
        private loginService : LoginService) {
     
            this.token = this.userService.getToken();
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No-Auth") === 'true') {
            return next.handle(req.clone());
        }

        

      
        req = this.addToken(req, this.token);
        return next.handle(req).pipe(
            catchError(
                
                (err : HttpErrorResponse) => {
                    
                    if(err.status == 401){
                        if(this.userService.getToken() != null){
                        this.loginService.setFormHeader("Session Expired", "Red")
                        }else{
                            this.loginService.setFormHeader("Must Login first to access the page", "Red")
                        }
                        this.router.navigate(['/login'])
                    }else if(err.status == 403){
                        this.router.navigate(['/forbidden'])
                    }
                    return throwError("Something is wrong")
                }
            )
        )
    }


    private addToken(req : HttpRequest<any>, token : string | null){
         return req.clone(
            {
                setHeaders : {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials : true
            }
        );
    }

    
}