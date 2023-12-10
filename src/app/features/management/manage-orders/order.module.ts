import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineOrdersComponent } from './online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './onsite-orders/onsite-orders.component';
import { ManageFoodsComponent } from '../manage-foods/manage-foods.component';
import { ManageOrdersNavbarComponent } from './manage-orders-navbar/manage-orders-navbar.component';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/shared/module/form.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgxModule } from 'src/app/shared/module/ngx.module';



@NgModule({
  declarations: [
    ManageOrdersNavbarComponent,
    OnsiteOrdersComponent,
    OnlineOrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormModule,
    UiModule,
    NgxModule
    
  ]
})
export class OrderModule { }
