import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OnlineOrdersComponent } from './online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './onsite-orders/onsite-orders.component';
import { ManageOrdersNavbarComponent } from './manage-orders-navbar/manage-orders-navbar.component';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/shared/module/form.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgxModule } from 'src/app/shared/module/ngx.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { OrderManagementBodyComponent } from './order-management-body/order-management-body.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { NgprimeModule } from '@shared/module/ngprime.module';



@NgModule({
  declarations: [
    ManageOrdersNavbarComponent,
    OnsiteOrdersComponent,
    OnlineOrdersComponent,
    OrderManagementBodyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormModule,
    UiModule,
    NgxModule,
    MaterialModule,
    TemplatesModule,
    NgprimeModule
  ],
  providers: [DatePipe]
})
export class OrderModule { }
