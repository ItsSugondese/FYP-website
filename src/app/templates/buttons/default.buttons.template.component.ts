import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';


@Component({
  selector: 'default-button-template',
  template: `
  <button
          class="w-fit hover:cursor-pointer text-customPrimary border-customPrimary border-2 rounded-lg px-2 py-1.5 text-base flex items-center"
          [class]="getButtonCss()" [disabled]="isDisabled == true">
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
    constructor() { super()}

    getButtonCss() : string {
        return `bg-${this.background} text-${this.color}`
    }
  
    
}
