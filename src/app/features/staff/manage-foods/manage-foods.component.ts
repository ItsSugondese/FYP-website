import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent implements OnInit {
  isSwitchChecked: boolean = false;
  items: any[] = [{}];

  ngOnInit(): void {
  }

  resetSwitch() {
    this.isSwitchChecked = !this.isSwitchChecked;
    if(this.isSwitchChecked && this.items.length<1){
      this.items.push({});
    }
  }

  addItem() {
    // Add a new item to the array
    this.items.push({});
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    if(this.items.length < 1){
      this.isSwitchChecked = false;
    }
  }

}
