import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFoodsComponent } from './manage-foods/manage-foods.component';

import { OrderModule } from './manage-orders/order.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { NgxModule } from 'src/app/shared/module/ngx.module';
import { NgprimeModule } from 'src/app/shared/module/ngprime.module';
import { StaffDisableHistoryComponent } from './people-management/manage-staff/staff-inspect/staff-disable-history/staff-disable-history.component';
import { UserDisableHistoryComponent } from './people-management/manage-users/user-inspect/user-disable-history/user-disable-history.component';
import { ManageStaffComponent } from './people-management/manage-staff/manage-staff.component';
import { ManageUsersComponent } from './people-management/manage-users/manage-users.component';
import { AddStaffComponent } from './people-management/manage-staff/add-staff/add-staff.component';
import { StaffDetailsComponent } from './people-management/manage-staff/staff-inspect/staff-details/staff-details.component';
import { UserDetailsComponent } from './people-management/manage-users/user-inspect/user-details/user-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FoodFilterComponent } from 'src/app/templates/food-menu/food-filter.component';



@NgModule({
  declarations: [
    ManageStaffComponent,
    ManageFoodsComponent,
    ManageUsersComponent,
    AddStaffComponent,
    StaffDetailsComponent,
    UserDetailsComponent,
    StaffDisableHistoryComponent,
    UserDisableHistoryComponent,
    FoodFilterComponent
  ],
  imports: [
    CommonModule,
    OrderModule,
    UiModule,
    FormModule,
    NgxModule,
    NgprimeModule,
    FlexLayoutModule,
    MaterialModule,
    
  ]
})
export class ManagementModule { }
