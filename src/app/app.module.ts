import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { AuthModule } from './_auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { FeaturesModule } from './features/features.module';
import { UiModule } from './shared/ui/ui.module';
import { TemplatesModule } from './templates/templates.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FeaturesLayoutComponent } from './layouts/features-layout/features-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserPageHolderModule } from './layouts/user-layout/user/user.module';
import { ManagementLayoutComponent } from './layouts/management-layout/management-layout.component';
import { GoogleChartsConfig, GoogleChartsModule } from 'angular-google-charts';
import { ReplaySubject, take, Observable } from 'rxjs';

@Injectable()
export class GoogleChartsConfigService {
  private configSubject = new ReplaySubject<GoogleChartsConfig>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadLazyConfigValues(): void {
    this.http.post('https://special.config.api.com/getchartsconfig', {})
      .pipe(take(1))
      .subscribe(config => this.configSubject.next(config));
  }
}

// Factory function that provides the config$ observable from your GoogleChartsConfigService
export function googleChartsConfigFactory(configService: GoogleChartsConfigService): Observable<GoogleChartsConfig> {
  return configService.config$;
}
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginLayoutComponent,
    FeaturesLayoutComponent,
    UserLayoutComponent,
    ManagementLayoutComponent,
  ],
  imports: [
    UiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    TemplatesModule,
    GoogleChartsModule
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
