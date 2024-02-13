import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-food-body',
  templateUrl: './manage-food-body.component.html',
  styleUrls: ['./manage-food-body.component.scss']
})
export class ManageFoodBodyComponent {

  @Input() isOpenDrawer : boolean = true;
  


  
  onToggleDrawer(data: boolean){
    this.isOpenDrawer = data
    
  }
}
