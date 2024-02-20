import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserOrderComponent } from 'src/app/features/user-order/user-order.component';
import { HomepageComponent } from 'src/app/features/homepage/homepage.component';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@shared/module/material.module';
import { NgprimeModule } from '@shared/module/ngprime.module';
import { FormModule } from '@shared/module/form.module';


@NgModule({
  declarations: [
    UserOrderComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TemplatesModule,
    FlexLayoutModule,
    MaterialModule,
    NgprimeModule,
    FormModule
  ]
})
export class UserPageHolderModule { }
