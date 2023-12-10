import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbTimepicker
  ],
  exports : [
    NgbModule,
    NgbTimepicker,
  ]
})
export class NgBootstrapModule { }
