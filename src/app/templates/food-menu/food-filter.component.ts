// radio-button.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { EnumItem } from 'src/app/shared/model/enums/MapForEnum.model';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';






@Component({
  selector: 'food-filter-template',
  template: `
  <ng-container *ngFor="let option of options">
    <div  
    class=" inline-block rounded-2xl ml-2 p-1 px-3 first:ml-0  text-customPrimary bg-nonSelectedFoodFilterBg" 
    [ngClass]="{
      'bg-red-700': option.key == selectedKey,
      'text-white': option.key == selectedKey
    }"
    (click)="selectOption(option)">
      <label class="hover:cursor-pointer">{{ option.value }}</label>
    </div>
  </ng-container>
  `,
  styles: [
    /* Add your component-specific styles here */
],
})
export class FoodFilterComponent extends CommonVariable implements OnInit, OnDestroy{
  
  @Output() optionSelected = new EventEmitter<string | null>();
  // options : EnumItem[] = this.enumToEnumItems(FoodFilterType)
  @Input() options !: EnumItem[] 

  @Input() selectedKey = 'MEAL'

  constructor(private ngZone: NgZone){
    super()
  }
  
  
  
  ngOnInit(): void {
  }


  
  selectOption(label: EnumItem) {
      this.selectedKey = label.key;
        this.optionSelected.emit(label.key.toUpperCase());
  }

  ngOnDestroy(): void {

  }

  
}
