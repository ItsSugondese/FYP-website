import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodFilterComponent } from './food-menu/food-filter.component';
import { SnackbarTemplateComponent } from './snackbar/snackbar.template.component';
import { MaterialModule } from '../shared/module/material.module';
import { CalenderTemplateComponent } from './calender/calender.template.componenet';
import { NgprimeModule } from '../shared/module/ngprime.module';
import { FormModule } from '../shared/module/form.module';
import { SearchTemplateComponent } from './search/search.template.componenet';
import { NoContentComponent } from './not-found/no-content.template.component';
import { TextTypeComponent } from './design/type-text/text-type.template.component';
import { PaginationDropdownComponenet } from './dropdown/pagination-dropdown.template.component';
import { DisableEnableButtonComponent } from './buttons/disable-buttons.template.component';
import { AddButtonComponent } from './buttons/add-buttons.template.component';
import { FileUploadComponent } from './file-upload/file-upload.template.component';



@NgModule({
  declarations: [
    FoodFilterComponent,
  SnackbarTemplateComponent,
  CalenderTemplateComponent,
  SearchTemplateComponent,
  NoContentComponent,
  TextTypeComponent,
  PaginationDropdownComponenet,
  DisableEnableButtonComponent,
  AddButtonComponent,
  FileUploadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgprimeModule,
    NgprimeModule,
    FormModule,
    MaterialModule
  ],
  exports:[
    FoodFilterComponent,
  SnackbarTemplateComponent,
  CalenderTemplateComponent,
  SearchTemplateComponent,
  NoContentComponent,
  TextTypeComponent,
  PaginationDropdownComponenet,
  DisableEnableButtonComponent,
  AddButtonComponent,
  FileUploadComponent
  ]
})
export class TemplatesModule { }
