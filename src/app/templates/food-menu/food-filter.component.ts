// radio-button.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';

@Component({
  selector: 'food-filter-template',
  template: `
    <div *ngFor="let option of options" class="radio-container inline-block rounded-2xl p-1 px-3 text-white bg-customPrimary" (click)="selectOption(option)">
      <label>{{ option }}</label>
    </div>
  `,
  styles: [
    /* Add your component-specific styles here */
],
})
export class FoodFilterComponent implements OnInit, OnDestroy{
  options$ !: Subscription
  options !: string[]
  @Output() optionSelected = new EventEmitter<string>();


  constructor(private enumService: EnumService){}
  
  ngOnInit(): void {
    this.options$ = this.enumService.getFoodMenuData().subscribe(
      (respose) => {
        this.options = respose.data
      }
    )
  }
  
  
  
  selectOption(label: string) {
    this.optionSelected.emit(label);
  }

  ngOnDestroy(): void {
   if(this.options$){
    this.options$.unsubscribe()
   }
  }
}
