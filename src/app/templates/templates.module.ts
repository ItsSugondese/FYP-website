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



@NgModule({
  declarations: [
    FoodFilterComponent,
  SnackbarTemplateComponent,
  CalenderTemplateComponent,
  SearchTemplateComponent,
  NoContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgprimeModule,
    NgprimeModule,
    FormModule
  ],
  exports:[
    FoodFilterComponent,
  SnackbarTemplateComponent,
  CalenderTemplateComponent,
  SearchTemplateComponent,
  NoContentComponent
  ]
})
export class TemplatesModule { }
