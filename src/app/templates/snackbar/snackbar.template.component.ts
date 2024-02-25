// radio-button.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from './snackbar-service/snackbar.service';
import { Message } from 'primeng/api';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';

export interface CustomMessage  {
    label : string,
    status : MessageStatus
}
export enum MessageStatus {
    SUCCESS, FAIL
}

@Component({
  selector: 'snackbar-template',
  template: `
   <div 
  class="snackbar fixed top-0 z-50 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-300 ease-in-out
  shadow-lg p-2 bg-white rounded border-2 border-gray-300 flex "
  [class.opacity-100]="snackbarService.isVisible"
  [class.translate-y-2]="snackbarService.isVisible"
  [class.-translate-y-full]="!snackbarService.isVisible">

  <mat-icon [style.color]="'green'" *ngIf="message?.status == messageStatus.SUCCESS">check_circle_outline</mat-icon>
  <mat-icon [style.color]="'red'"  *ngIf="message?.status == messageStatus.FAIL">error_outline</mat-icon>
  <div class="ml-2">
  {{ message?.label }}
</div>
</div>

  `,
  styles: [
],
})
export class SnackbarTemplateComponent extends CommonVariable implements OnInit, OnDestroy{
    success = MessageStatus.SUCCESS
    message: CustomMessage | null = null;

  subscription$!: Subscription
    constructor(public snackbarService: SnackbarService) {
      super()
     }
  
    ngOnInit(): void {
        this.subscription$ =  this.snackbarService.message$.subscribe((message: CustomMessage) => {
          this.message = message;
          this.snackbarService.isVisible = true;
          setTimeout(() => {
            this.snackbarService.isVisible= false
          }, 4000); // Snackbar duration
        });
      }

      ngOnDestroy(): void {
        if (this.subscription$) {
          this.subscription$.unsubscribe();
        }
      }
}
