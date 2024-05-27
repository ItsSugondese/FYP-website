import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { LoginService } from './login-service/login.service';
import { AuthService } from '../../auth-service/auth.service';
import { UserService } from 'src/app/shared/service/user-service/user.service';
import { loginFormHeader } from 'src/app/shared/model/design/login.model';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';
import { UserRouteConstant } from 'src/app/constant/routing/user-routing-constant.model';
import { LoginModel } from '../../auth-service/model/auth.model';
import { Subscription } from 'rxjs';
import { error } from 'jquery';
import { SnackbarService } from 'src/app/templates/snackbar/snackbar-service/snackbar.service';
import { MessageStatus } from 'src/app/templates/snackbar/snackbar.template.component';
import { HttpErrorResponse } from '@angular/common/http';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  private clientId = environment.clientId;
  formHeader !: loginFormHeader;
  loginWithGoogleSubscription$ !: Subscription
  isGoogleLogin: boolean = false;
  constructor(
    public router: Router,
    public service: AuthService,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private userService: UserService, private snackService: SnackbarService) {
    this.formHeader = loginService.formHeader;
  }

  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        
        document.getElementById("parent"),
        { theme: "outline", size: "large", width: "100%",}
        );
        //@ts-ignore
        google.accounts.id.renderButton(
          // @ts-ignore
          
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", width: "100%",}
        );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

   async handleCredentialResponse(response: CredentialResponse) {
      await this.service.LoginWithGoogle(response.credential).subscribe(
        (result) => {

          
      this.afterLoginHandler(result)
        },
      )
     

  
    
  }
  

   onSubmit() {
    //this.formSubmitAttempt = false;
    if (this.form.valid) {
      const val : LoginModel = {
        userEmail: this.formValue('email')?.value,
        userPassword: this.formValue('password')?.value
      }

      this.service.loginUser(val).subscribe(
        (result) => {
         this.afterLoginHandler(result)
          
        }
      )
    } 
  }

  afterLoginHandler(result : any){
    this.userService.setToken(result.data.jwtToken);
    this.userService.setRoles(result.data.roles);
    this.userService.setUsername(result.data.username);
    this.userService.setUserId(result.data.userId);
    const role = result.data.roles[0];
    if(role == 'ADMIN'){
    this.router.navigate(['/' + ManagementRouteConstant.adminDashboard])
  }else if(role == 'STAFF'){
      this.router.navigate(['/' + ManagementRouteConstant.staffDashboard])
    }else{
      this.router.navigate(['/' + UserRouteConstant.homepage])

    }
  }

  formValue(name: string) {
    return this.form.get(name);
  }

  ngOnDestroy(): void {
      if(this.loginWithGoogleSubscription$){
        this.loginWithGoogleSubscription$.unsubscribe()
      }
  }


}