import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { loginFormHeader } from '../interface';
import { LoginService } from './login-service/login.service';
import { UserService } from '../_user-service/user.service';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    username: ['', Validators.email],
    password: ['', Validators.required]
  });

  private clientId = environment.clientId;
  formHeader !: loginFormHeader;

  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private userService: UserService) {
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
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.service.LoginWithGoogle(response.credential).subscribe(
      (result: any) => {
        this.formHeader = {
          status: "Login Successful",
          color: "Green"
        }


        this.userService.setRoles(result.data.roles);
        this.userService.setToken(result.data.jwtToken);
        this.userService.setUsername(result.data.username);


        if ((result.data.roles as string[]).includes('ADMIN'.toUpperCase())) {
          this.router.navigate(['/admin/manage_staff'])
        } else if ((result.data.roles).includes('STAFF'.toUpperCase)) {
          this.router.navigate(["/admin/manage_staff"])
        } else {
          this.router.navigate(['/logout']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  async onSubmit() {
    //this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.service.login(this.form.value).subscribe((x: any) => {
          this.router.navigate(['/logout']);
          this._snackBar.open("Login Successful", "Close", {
            duration: 2000
          });
        },
          (error: any) => {
            console.error(error);
            this._snackBar.open("Error with Username or Password", "Close", {
              duration: 5000
            });
          });
      } catch (err) {
        this._snackBar.open("Error with Username or Password", "Close", {
          duration: 5000
        });
      }
    } else {
      //this.formSubmitAttempt = true;
    }
  }



}