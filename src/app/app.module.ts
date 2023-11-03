import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { ManageStaffComponent } from './features/admin/manage-staff/manage-staff.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { ManageFoodsComponent } from './features/staff/manage-foods/manage-foods.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { ManageOrdersNavbarComponent } from './features/staff/manage-orders/manage-orders-navbar/manage-orders-navbar.component';
import { OnlineOrdersComponent } from './features/staff/manage-orders/online-orders/online-orders.component';
import { OnsiteOrdersComponent } from './features/staff/manage-orders/onsite-orders/onsite-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomepageComponent } from './features/everyone/homepage/homepage.component';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AdminDashboardComponent,
    ManageStaffComponent,
    SidenavComponent,
    ManageFoodsComponent,
    ManageOrdersNavbarComponent,
    OnlineOrdersComponent,
    OnsiteOrdersComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgbModule,
    NgbTimepicker,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
