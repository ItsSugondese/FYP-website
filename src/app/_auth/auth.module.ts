import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './registration/login/login.component';
import { LogoutComponent } from './registration/logout/logout.component';
import { FormModule } from '../shared/module/form.module';
import { MaterialModule } from '../shared/module/material.module';
import { UiModule } from '../shared/ui/ui.module';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordResetComponent } from './registration/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './registration/forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormModule,
    MaterialModule,
    UiModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
