import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { NgprimeModule } from 'src/app/shared/module/ngprime.module';
import { NgxModule } from 'src/app/shared/module/ngx.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { FeedbackInspectComponent } from '../feedback/feedback-inspect/feedback-inspect.component';
import { ManageFoodBodyComponent } from './manage-food-body/manage-food-body.component';
import { AddFoodComponent } from './manage-food-body/manage-food-drawer/add-food/add-food.component';
import { ManageFoodDrawerComponent } from './manage-food-body/manage-food-drawer/manage-food-drawer.component';
import { ManageFoodsComponent } from './manage-food-body/manage-foods/manage-foods.component';
import { OrderModule } from './manage-orders/order.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageStaffBodyComponent } from './people-management/manage-staff-body/manage-staff-body.component';
import { ManageStaffComponent } from './people-management/manage-staff-body/manage-staff/manage-staff.component';
import { AddStaffComponent } from './people-management/manage-staff-body/manage-staff/add-staff/add-staff.component';
import { StaffDetailsComponent } from './people-management/manage-staff-body/manage-staff/staff-inspect/staff-details/staff-details.component';
import { StaffDisableHistoryComponent } from './people-management/manage-staff-body/manage-staff/staff-inspect/staff-disable-history/staff-disable-history.component';
import { ManageUserBodyComponent } from './people-management/manage-user-body/manage-user-body.component';
import { ManageUsersComponent } from './people-management/manage-user-body/manage-users/manage-users.component';
import { UserDetailsComponent } from './people-management/manage-user-body/manage-users/user-inspect/user-details/user-details.component';
import { UserDisableHistoryComponent } from './people-management/manage-user-body/manage-users/user-inspect/user-disable-history/user-disable-history.component';
import { UserInspectBodyComponent } from './people-management/manage-user-body/manage-users/user-inspect/user-inspect-body.component';
import { StaffInspectBodyComponent } from './people-management/manage-staff-body/manage-staff/staff-inspect/staff-inspect-body.component';
import { UserPaymentHistoryComponent } from './people-management/manage-user-body/manage-users/user-inspect/user-payment-history/user-payment-history.component';



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
    ManageFoodDrawerComponent,
    FeedbackInspectComponent,
    AddFoodComponent,
    ManageFoodBodyComponent,
    UserInspectBodyComponent,
    ManageUserBodyComponent,
    ManageStaffBodyComponent,
    StaffInspectBodyComponent,
    UserPaymentHistoryComponent,
    
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
    BsDatepickerModule.forRoot(),
    NgprimeModule,
    TemplatesModule,
  ]
})
export class ManagementModule { }
