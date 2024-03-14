import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';


@Component({
    selector: 'are-you-sure-template',
    template: `
   <p-dialog  [(visible)]="visible" [closable]="isLoading? false: true" [style]="{'width': '500px'}"
   (onHide)="afterHide()" 
[modal]="true">

        <p-header>
      <div class="d-flex  justify-content-between align-items-center">
        <div class="h4">{{header}}</div>
      </div>
</p-header>
  

<ng-container>
      <div class="form-group">
        <label >{{description}}</label>
      </div>
</ng-container>

    <p-footer>
      <div class="d-flex justify-content-between align-items-center">
        <div (click)="yesEvent.emit(selectedId)">
        <default-button-template [text]="positiveLabel" [isLoading]="isLoading"
        [isDisabled]="isLoading" [hasBorder]="true"></default-button-template>
        </div>
        <div (click)="this.visibleChange.emit(false);">
        <default-button-template [text]="negativeLabel" [background]="'white'" [color]="'customPrimary'"
        [hasBorder]="true"
        [isDisabled]="isLoading" ></default-button-template>
</div>
    </div>
    </p-footer>
  </p-dialog>

  `,
    styles: [
    ],
})
export class AreYouSureComponent extends CommonVariable implements OnChanges  {

    @Input() selectedId !: number
    @Input() visible !: boolean
    @Input() header !: string
    @Input() description !: string
    @Input() positiveLabel !: string
    @Input() negativeLabel !: string
    @Input() isLoading : boolean = false
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    @Output() yesEvent: EventEmitter<number> = new EventEmitter();


    constructor(private cdr: ChangeDetectorRef) { super() }
    ngOnChanges(changes: SimpleChanges): void {
    }

   
    afterHide() {
        this.visibleChange.emit(false);
    }



}
