import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageStaffComponent } from './features/admin/manage-staff/manage-staff.component';
import { AuthGuard } from './_auth/auth.guard';
import { ManageFoodsComponent } from './features/staff/manage-foods/manage-foods.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'manage_food', component: ManageFoodsComponent},
  {path: 'admin/manage_staff', component : ManageStaffComponent, canActivate: [AuthGuard], data: {roles:['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
