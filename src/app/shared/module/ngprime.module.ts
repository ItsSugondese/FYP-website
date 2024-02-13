import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports : [
    DialogModule,
    ButtonModule,
    CalendarModule
  ]
})
export class NgprimeModule { }
