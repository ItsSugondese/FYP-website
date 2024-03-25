import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'search-with-filter-template',
  template: `
<div
          class="p-1 px-2 w-64 bg-white mt-1  rounded-md shadow-sm flex border-2 border-[#CED4DA] focus-within:border-customPrimary ">
          <input type="text" id="search" name="search" class="block w-full sm:text-sm  focus:outline-none"
            placeholder="Search"  (keyup.enter)="searchData($event)">
            <div class="hover:cursor-pointer" cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="isOpen = true">
          <mat-icon class="" >filter_list</mat-icon>
          <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="trigger" [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayHasBackdrop]="true"
          [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'" (overlayOutsideClick)="isOpen = false"
          [cdkConnectedOverlayPositions]="[{originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'top', 
                                                    offsetY: 30}]" style="z-index: 9">
          <div class="bg-white p-3 border-gray-50 drop-shadow-lg z-10">
            <ng-container *ngFor="let key of getMapKeys(); let last = last">
              <input class="hover:cursor-pointer" type="radio" name="value" [value]="filterDataList[key]" [(ngModel)]="selectedItem"
                (change)="onInputChange(selectedItem)">
              <span>
                {{ key }}
              </span>
              <br *ngIf="!last">
            </ng-container>


          </div>


        </ng-template>
</div>
        </div>
  `,
  styles: [
    `
    .cdk-overlay-container{
  z-index:9; //lower then fixed header z-index so it goes behind it
}
    `
],
})
export class SearchWithFilterTemplateComponent implements OnInit{
  

    @Input() filterDataList !: { [key: string]: any | null }
@Input() selectedItem : any | null ;
  @Output() typedData : EventEmitter<string> = new EventEmitter();
  @Output() selectedFilter : EventEmitter<any | null> = new EventEmitter();
  @Input() isOpen: boolean = false

    constructor() { }
  
    ngOnInit(): void {
        this.selectedItem =  Object.values(this.filterDataList)[0];
    }

    searchData(event: any){
      const searchValue = (event.target as HTMLInputElement).value;
      this.typedData.emit(searchValue)
    }

    onInputChange(val: any | null){
       this.selectedFilter.emit(val)
      }


    getMapKeys(): string[] {
        return Object.keys(this.filterDataList);
      }

}
