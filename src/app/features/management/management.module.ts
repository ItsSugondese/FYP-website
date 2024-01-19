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
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NgxModule } from 'src/app/shared/module/ngx.module';
import { AddStaffComponent } from './manage-staff/add-staff/add-staff.component';
import { StaffDetailsComponent } from './manage-staff/staff-details/staff-details.component';
import { UserDetailsComponent } from './manage-users/user-details/user-details.component';



@NgModule({
  declarations: [
    ManageStaffComponent,
    ManageFoodsComponent,
    ManageUsersComponent,
    AddStaffComponent,
    StaffDetailsComponent,
    UserDetailsComponent

  ],
  imports: [
    CommonModule,
    OrderModule,
    UiModule,
    FormModule,
    NgxModule
  ]
})
export class ManagementModule { }
