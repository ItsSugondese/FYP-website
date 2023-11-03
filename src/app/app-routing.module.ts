import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageStaffComponent } from './features/admin/manage-staff/manage-staff.component';
import { AuthGuard } from './_auth/auth.guard';
import { ManageFoodsComponent } from './features/staff/manage-foods/manage-foods.component';
import { OnlineOrdersComponent } from './features/staff/manage-orders/online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './features/staff/manage-orders/onsite-orders/onsite-orders.component';
import { HomepageComponent } from './features/everyone/homepage/homepage.component';

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
