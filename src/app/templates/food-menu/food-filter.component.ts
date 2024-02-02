// radio-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-filter',
  template: `
    <div *ngFor="let option of options" class="radio-container inline-block rounded-2xl p-1 px-3 text-white bg-customPrimary" (click)="selectOption(option.label)">
      <label for="{{ option.label }}">{{ option.label }}</label>
    </div>
  `,
  styles: [
    /* Add your component-specific styles here */
],
})
export class FoodFilterComponent {
  @Input() options: any[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  selectOption(label: string) {
    this.optionSelected.emit(label);
  }
}
