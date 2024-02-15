import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ManageFoodsService } from './manage-foods/manage-foods-service/manage-foods.service';

@Component({
  selector: 'app-manage-food-body',
  templateUrl: './manage-food-body.component.html',
  styleUrls: ['./manage-food-body.component.scss']
})
export class ManageFoodBodyComponent implements OnInit, OnDestroy {

  @Input() isOpenDrawer : boolean = false;
  isLoading : boolean = false;
  constructor(private foodService: ManageFoodsService){

  }
  ngOnInit(): void {
    
  }

  

  
  onToggleDrawer(data: boolean){
    this.isOpenDrawer = data
    
  }
  ngOnDestroy(): void {
   
  }
}
