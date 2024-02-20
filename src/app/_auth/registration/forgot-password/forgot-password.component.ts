import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service/auth.service';
import { ValidateToken } from '../../auth-service/model/forgot-password.model';
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {

  forgotPasswordSubscription$ !: Subscription

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
    public router: Router){}
  
  onSubmit() {
    //this.formSubmitAttempt = false;
    if (this.form.valid) {
      const val : ValidateToken = {
        resetToken: this.formValue('email')?.value
      }
    this.forgotPasswordSubscription$ =   this.authService.validatePasswordToken(val).subscribe(
      (res) => {
        this.forgotPasswordSubscription$.unsubscribe()
      }
     )
    } 
  }

  formValue(name: string) {
    return this.form.get(name);
  }

  ngOnDestroy(): void {
    if(this.forgotPasswordSubscription$){
      this.forgotPasswordSubscription$.unsubscribe()
    }
  }
}
