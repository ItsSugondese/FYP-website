import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';


@Component({
  selector: 'default-button-template',
  template: `
  <button
          class="w-fit hover:cursor-pointer text-customPrimary border-customPrimary  rounded-lg px-2 py-1.5 text-base flex items-center"
          [class]="getButtonCss()" [disabled]="isDisabled == true"
          [ngClass]="{'disabled-button': isDisabled}" (click)=" clicked.emit()">
          <span class="" *ngIf="!isLoading; else loaded">
            {{text}}
          </span>
          <ng-template #loaded>
          <div class="w-8 flex items-center">
          <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
          </ng-template>
        </button>
  `,
  styles: [`

  `
    
],
})
export class DefaultButtonComponent extends CommonVariable{

    @Input() text !: string 
    @Input() background : string = "customPrimary"
    @Input() color : string = "white"
    @Input() isLoading : boolean = false;
    @Input() isDisabled : boolean = false;
    @Input() border : string = "customPrimary"
    @Input() hasBorder : boolean = false
    

    @Output() clicked : EventEmitter<void> = new EventEmitter<void>()
    constructor() { super()}

    getButtonCss() : string {
      let borderVal = this.hasBorder ? `border-2 border-${this.border}` : ''
        return `bg-${this.background} text-${this.color} ${borderVal}`
    }
  
    
}
