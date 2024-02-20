import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_auth/auth.guard';
import { ManagementRouteConstant } from '../constant/routing/management-routing-constant.model';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { FeedbackInspectComponent } from './feedback/feedback-inspect/feedback-inspect.component';
import { ManageFoodBodyComponent } from './management/manage-food-body/manage-food-body.component';
import { OnlineOrdersComponent } from './management/manage-orders/online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './management/manage-orders/onsite-orders/onsite-orders.component';
import { OrderManagementBodyComponent } from './management/manage-orders/order-management-body/order-management-body.component';
import { ManageStaffBodyComponent } from './management/people-management/manage-staff-body/manage-staff-body.component';
import { AddStaffComponent } from './management/people-management/manage-staff-body/manage-staff/add-staff/add-staff.component';
import { StaffDetailsComponent } from './management/people-management/manage-staff-body/manage-staff/staff-inspect/staff-details/staff-details.component';
import { StaffDisableHistoryComponent } from './management/people-management/manage-staff-body/manage-staff/staff-inspect/staff-disable-history/staff-disable-history.component';
import { ManageUserBodyComponent } from './management/people-management/manage-user-body/manage-user-body.component';
import { UserDetailsComponent } from './management/people-management/manage-user-body/manage-users/user-inspect/user-details/user-details.component';
import { UserDisableHistoryComponent } from './management/people-management/manage-user-body/manage-users/user-inspect/user-disable-history/user-disable-history.component';
import { TestComponent } from './test/test.component';
import { StaffDashboardComponent } from './dashboard/staff-dashboard/staff-dashboard.component';

const routes: Routes = [
  {path: ManagementRouteConstant.foodManagement, component: ManageFoodBodyComponent,  data: {roles:['ADMIN']}},
  {path: ManagementRouteConstant.staffManagement, component : ManageStaffBodyComponent, canActivate: [AuthGuard], data: {roles:['USER']}},
  {path: 'admin/manage_staff/:id', component : StaffDetailsComponent, canActivate: [AuthGuard], data: {roles:['USER']}},
  {path: 'admin/manage_staff/:id/history', component : StaffDisableHistoryComponent, canActivate: [AuthGuard], data: {roles:['USER']}},
  {path: ManagementRouteConstant.addStaff, component : AddStaffComponent,},
  {path: ManagementRouteConstant.orderManagement, component: OrderManagementBodyComponent},
  {path: ManagementRouteConstant.onlineOrderManagement, component: OnlineOrdersComponent},
  {path: ManagementRouteConstant.onsiteOrderManagement, component: OnsiteOrdersComponent},
  {path: ManagementRouteConstant.userManagement, component: ManageUserBodyComponent},
  {path: 'manage_users/:id', component: UserDetailsComponent},
  {path: 'manage_users/:id/history', component: UserDisableHistoryComponent},
  {path: ManagementRouteConstant.adminDashboard, component: AdminDashboardComponent},
  {path: ManagementRouteConstant.staffDashboard, component: StaffDashboardComponent},
  // {path: 'feedback/:id', component: FeedbackComponent}
  {path: 'feedback/:id', component: FeedbackInspectComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
