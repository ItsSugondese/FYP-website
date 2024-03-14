import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { NgxModule } from '@shared/module/ngx.module';
import { NgprimeModule } from '@shared/module/ngprime.module';
import { FormModule } from '@shared/module/form.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MaterialModule } from '@shared/module/material.module';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    StaffDashboardComponent,
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    NgprimeModule,
    FormModule,
    TemplatesModule,
    MaterialModule,
    NgxModule
  ]
})
export class DashboardModule { }
