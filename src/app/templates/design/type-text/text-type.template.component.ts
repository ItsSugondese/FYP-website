import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'text-type-template',
  template: `
  <div class=" inline-block rounded-lg text-[#1565C0] p-1 px-2 bg-blue-200"
  [class.text-red-700]="!status"
  [class.bg-red-300]="!status"
  >
                      {{text}}
                    </div>
  `,
  styles: [
],
})
export class TextTypeComponent{

    @Input() text !: string
    @Input() status : boolean = true
    constructor() { }
  
    
}
