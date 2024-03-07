import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropzoneComponent, DropzoneModule } from 'ngx-dropzone-wrapper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports : [
    NgxPaginationModule,
    DropzoneModule,
    InfiniteScrollModule
   
  ]
})
export class NgxModule { }
