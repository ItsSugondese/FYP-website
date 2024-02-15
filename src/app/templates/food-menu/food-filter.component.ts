// radio-button.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';

export enum FoodFilterType {
  ALL = 'All',
  MEAL = 'Meal',
  DRINKS = 'Drinks',
  MISC = 'Misc'
}

interface EnumItem {
  key: string;
  value: string;
}


@Component({
  selector: 'food-filter-template',
  template: `
    <div *ngFor="let option of options" 
    class="radio-container   inline-block rounded-2xl ml-2 p-1 px-3 first:ml-0  text-customPrimary bg-nonSelectedFoodFilterBg" 
    [ngClass]="{
      'bg-red-700': option.key === selectedKey,
      'text-white': option.key === selectedKey
    }"
    (click)="selectOption(option)">
      <label class="hover:cursor-pointer">{{ option.value }}</label>
    </div>
  `,
  styles: [
    /* Add your component-specific styles here */
],
})
export class FoodFilterComponent implements OnInit, OnDestroy{
  
  @Output() optionSelected = new EventEmitter<string | null>();
  options: EnumItem[] = Object.keys(FoodFilterType).map(key => ({ key, value: FoodFilterType[key as keyof typeof FoodFilterType] }));
  // options = FoodFilterType

  selectedKey = 'ALL'

  constructor(private enumService: EnumService){}
  
  ngOnInit(): void {
    // this.options$ = this.enumService.getFoodMenuData().subscribe(
    //   (respose) => {
    //     this.options = respose.data
    //   }
    // )
  }
  
  
  
  selectOption(label: EnumItem) {
    this.selectedKey = label.key
    this.optionSelected.emit(label.key == 'ALL' ? null : label.key.toUpperCase());
  }

  ngOnDestroy(): void {
  //  if(this.options$){
  //   this.options$.unsubscribe()
  //  }
  }
}
