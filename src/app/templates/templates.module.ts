import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodFilterComponent } from './food-menu/food-filter.component';



@NgModule({
  declarations: [
    FoodFilterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    FoodFilterComponent
  ]
})
export class TemplatesModule { }
