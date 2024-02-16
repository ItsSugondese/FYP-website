// radio-button.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from './snackbar-service/snackbar.service';
import { Message } from 'primeng/api';

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
  class="snackbar fixed top-0 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-300 ease-in-out
  shadow-lg p-2 bg-white rounded border-2 border-gray-300 flex"
  [class.opacity-100]="isVisible"
  [class.translate-y-2]="isVisible"
  [class.-translate-y-full]="!isVisible">

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
export class SnackbarTemplateComponent implements OnInit{
    success = MessageStatus.SUCCESS
    messageStatus = MessageStatus
    message: CustomMessage | null = null;
  isVisible: boolean = false;

    constructor(private snackbarService: SnackbarService) { }
  
    ngOnInit(): void {
        this.snackbarService.message$.subscribe((message: CustomMessage) => {
          this.message = message;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible= false
            if(this.message?.status == MessageStatus.SUCCESS){
                // window.location.reload()
            }
          }, 4000); // Snackbar duration
        });
      }
}
