import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { LoginComponent } from './_auth/registration/login/login.component';
import { LogoutComponent } from './_auth/registration/logout/logout.component';
import { ManageFoodsComponent } from './features/management/manage-foods/manage-foods.component';
import { ManageStaffComponent } from './features/management/manage-staff/manage-staff.component';
import { OnlineOrdersComponent } from './features/management/manage-orders/online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './features/management/manage-orders/onsite-orders/onsite-orders.component';
import { HomepageComponent } from './features/homepage/homepage.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'manage_foods', component: ManageFoodsComponent,  data: {roles:['ADMIN']}},
  {path: 'admin/manage_staff', component : ManageStaffComponent, canActivate: [AuthGuard], data: {roles:['USER']}},
  {path: 'manage_online_orders', component: OnlineOrdersComponent},
  {path: 'manage_onsite_orders', component: OnsiteOrdersComponent},
  {path: 'homepage', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
