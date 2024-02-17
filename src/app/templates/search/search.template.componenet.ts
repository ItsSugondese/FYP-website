import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'search-template',
  template: `
<div
          class="p-1 px-2 w-64 bg-white mt-1  rounded-md shadow-sm flex border-2 border-[#CED4DA] focus-within:border-customPrimary ">
          <input type="text" id="search" name="search" class="block w-full sm:text-sm  focus:outline-none"
            placeholder="Search"  (keyup.enter)="searchData($event)">
          <mat-icon class="">search</mat-icon>
        </div>
  `,
  styles: [
],
})
export class SearchTemplateComponent implements OnInit{
  
  @Output() typedData : EventEmitter<string> = new EventEmitter();

    constructor() { }
  
    ngOnInit(): void {
    }

    searchData(event: any){
      const searchValue = (event.target as HTMLInputElement).value;
      this.typedData.emit(searchValue)
    }
}
