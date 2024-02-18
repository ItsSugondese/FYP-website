import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'disable-enable-button-template',
    template: `
  <button class="w-fit hover:cursor-pointer text-customPrimary border-customPrimary border-2 rounded-lg px-2 py-1.5 text-base flex items-center"
        [ngClass]="{
          'bg-white': status,
          'text-white border-0': !status,
          'bg-red-700': !status
        }">
  <div class="flex items-center" >
  <mat-icon *ngIf="!status">block</mat-icon>
  <mat-icon *ngIf="status">check_circle</mat-icon>
  </div>
  <span  class="pl-2 " [ngClass]="{'order-first': !isIconFirst, 'pl-0 pr-2': !isIconFirst}">
            {{text}}</span>
            </button>
            
  `,
    styles: [
    ],
})
export class DisableEnableButtonComponent {
    @Input() text !: string
    @Input() status: boolean = true
    @Input() isIconFirst: boolean = true;
    constructor() { }


}
