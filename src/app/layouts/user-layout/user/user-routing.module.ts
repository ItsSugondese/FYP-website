import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteConstant } from 'src/app/constant/routing/user-routing-constant.model';
import { HomepageComponent } from 'src/app/features/homepage/homepage.component';
import { UserOrderHistoryComponent } from 'src/app/features/user-order/user-order-history/user-order-history.component';
import { UserOrderComponent } from 'src/app/features/user-order/user-order.component';

const routes: Routes = [
  {path: UserRouteConstant.homepage, component: HomepageComponent},
  {path: UserRouteConstant.userOrder, component: UserOrderComponent},
  {path: UserRouteConstant.userOrderHistory, component: UserOrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
