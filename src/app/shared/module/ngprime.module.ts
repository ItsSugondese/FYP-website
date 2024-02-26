import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports : [
    DialogModule,
    ButtonModule,
    CalendarModule,
    MessagesModule,
    DropdownModule,
    DataViewModule,
    PanelModule
  ]
})
export class NgprimeModule { }
