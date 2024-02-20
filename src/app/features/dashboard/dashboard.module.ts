import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    StaffDashboardComponent,
  ],
  imports: [
    CommonModule,
    TemplatesModule
  ]
})
export class DashboardModule { }
