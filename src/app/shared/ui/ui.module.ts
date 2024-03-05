import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './nav/header/header.component';
import { MaterialModule } from '@shared/module/material.module';



@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports : [
    SidenavComponent,
    HeaderComponent
  ]
})
export class UiModule { }
