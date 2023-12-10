import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFoodsComponent } from './manage-foods/manage-foods.component';
import { ManageOrdersNavbarComponent } from './manage-orders/manage-orders-navbar/manage-orders-navbar.component';
import { OnsiteOrdersComponent } from './manage-orders/onsite-orders/onsite-orders.component';
import { OnlineOrdersComponent } from './manage-orders/online-orders/online-orders.component';
import { OrderModule } from './manage-orders/order.module';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { FormModule } from 'src/app/shared/module/form.module';



@NgModule({
  declarations: [
    ManageStaffComponent,
    ManageFoodsComponent

  ],
  imports: [
    CommonModule,
    OrderModule,
    UiModule,
    FormModule
  ]
})
export class ManagementModule { }
