import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './registration/login/login.component';
import { LogoutComponent } from './registration/logout/logout.component';
import { FormModule } from '../shared/module/form.module';
import { MaterialModule } from '../shared/module/material.module';
import { UiModule } from '../shared/ui/ui.module';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    MaterialModule,
    UiModule
  ]
})
export class AuthModule { }
