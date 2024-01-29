import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from './management/manage-orders/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManagementModule } from './management/management.module';
import { HomepageComponent } from './homepage/homepage.component';
import { UiModule } from '../shared/ui/ui.module';
import { NgprimeModule } from '../shared/module/ngprime.module';
import { FormModule } from '../shared/module/form.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackInspectComponent } from './feedback/feedback-inspect/feedback-inspect.component';
import { NgxModule } from '../shared/module/ngx.module';



@NgModule({
  declarations: [
    HomepageComponent,
    FeedbackComponent,
    FeedbackInspectComponent
  ],
  imports: [
    CommonModule,
    OrderModule,
    DashboardModule,
    ManagementModule,
    UiModule,
    NgprimeModule,
    FormModule,
    NgxModule
  ]
})
export class FeaturesModule { }
