import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface RowsList {
  name: number
}
@Component({
  selector: 'pagination-dropdown-template',
  template: `
    <p-dropdown [options]="data" [(ngModel)]="selectedOption"  optionLabel="name"
                        placeholder="{{defaultSelected}}" (onChange)="onSelectedDropdown()"
                    [autoDisplayFirst]="false" ></p-dropdown>
  `,
  styles: [
    `
  
    `
  ],
})
export class PaginationDropdownComponenet implements OnInit{

  @Input() data !: {name: number}[]
  @Input() defaultSelected : number = 10

  @Output() selectedDropdownOptionChange: EventEmitter<number> = new EventEmitter<number>();

  selectedOption !: {name:number}

  constructor() { }

  ngOnInit(): void {
  }
  
    onSelectedDropdown() {
      if(this.selectedOption != null){
      this.selectedDropdownOptionChange.emit(this.selectedOption.name);
    }
    }
}
