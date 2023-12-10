import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from './management/manage-orders/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManagementModule } from './management/management.module';
import { HomepageComponent } from './homepage/homepage.component';
import { UiModule } from '../shared/ui/ui.module';
import { NgprimeModule } from '../shared/module/ngprime.module';
import { FormModule } from '../shared/module/form.module';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    OrderModule,
    DashboardModule,
    ManagementModule,
    UiModule,
    NgprimeModule,
    FormModule
  ]
})
export class FeaturesModule { }
