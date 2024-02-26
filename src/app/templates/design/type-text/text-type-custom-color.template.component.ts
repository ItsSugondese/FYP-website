import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'text-type-custom-template',
  template: `
  <div class=" inline-block rounded-lg p-1 px-2" [class]="getCss()"
  >
                      {{text}}
                    </div>
  `,
  styles: [
],
})
export class TextTypeCustomColorComponent{

    @Input() color : string = "[#1565C0]"
    @Input() bgColor: string = "blue-200"
    @Input() border!: string | null
    @Input() text !: string
    constructor() { }
  
getCss(){
    this.border =  this.border == null ? this.bgColor : this.border
        return `text-${this.color} bg-${this.bgColor} border-2 border-${this.border}`
    }
    
}
