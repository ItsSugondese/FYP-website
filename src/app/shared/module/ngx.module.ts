import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropzoneComponent, DropzoneModule } from 'ngx-dropzone-wrapper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports : [
    NgxPaginationModule,
    DropzoneModule,
   
  ]
})
export class NgxModule { }
