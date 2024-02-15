import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ManageFoodsService } from './manage-foods-service/manage-foods.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { FoodFilter } from 'src/app/constant/filter/food-filter.model';
import { FoodMenuWithImageData, foodMenu } from './manage-foods-service/model/food-menu.model';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';
import { FoodMenuPagination } from './manage-foods-service/model/food-menu.payload';
import { CenterItems } from 'src/app/constant/class/display-center.model';
import { CommonVariable } from 'src/app/shared/helper/inherit/common-variable';

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent extends CommonVariable implements OnInit, OnDestroy {

  @Output() onOpeningDrawer : EventEmitter<boolean> = new EventEmitter();

  // centerItems : string = CenterItems()

  toggleDrawer(isOopen : boolean){
    this.onOpeningDrawer.emit(isOopen)
  }


  searchData!: string;
  navbarCollapse$ !: Subscription;
  collapsed !: boolean;

  foodMenuFetch$ !: Subscription;
  foodMenu : foodMenu[] = [];
  getFoodPicture$ !: Subscription;
  imageDataMap: { [key: number]: string } = {};
  
  foodMenuPagination : FoodMenuPagination = {
    page: 1,
    row: 10,
  }

  selectedFoodMenuType : string | null = null

  constructor(public foodService : ManageFoodsService,
    private formBuilder : FormBuilder, private router: Router,
    private sideNavService: SidenavService, private enumService: EnumService,
    ) {
      super()
    }

   
  ngOnInit(): void {
    
    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });

  this.getFoodMenu()
  }


  selectedFromFoodFilter(event: string | null){
    this.selectedFoodMenuType = event
    this.getFoodMenu()
  }


  typedFoodToFilter(event: string){
    console.log('emitted data is ' + event)
    if(event.trim() != ''){
      this.foodMenuPagination.name = event
    }else{
      this.foodMenuPagination.name = undefined
    }
    this.getFoodMenu()
  }


  toggleFormToEdit(item : foodMenu | null){
    let val !: FoodMenuWithImageData | null;
    
    if(item == null){
      val = null
    }else {
      val = {
        foodMenu: item,
        image: this.imageDataMap[item.photoId]
      }
    }
      this.foodService.sendSelectedFoodMenu(val)
  }




  getFoodMenu(){
    this.foodMenuPagination.foodType = this.selectedFoodMenuType
    
    this.foodMenuFetch$ = this.foodService.getFoodMenuPaginated(this.foodMenuPagination).subscribe(
      (response) => {
        
        this.foodMenu = response.data.content;

        this.foodMenu.forEach((menu) => {
          if(menu.photoId){
            this.getFoodPicture$ = this.foodService.getFoodPicture(menu.photoId).subscribe((imageBlob: Blob) => {


            createImageFromBlob(imageBlob, menu.photoId)
             .then((imageData) => {
              this.imageDataMap[menu.photoId] = imageData;
              
          })
          .catch((error) => {
              console.log("error when trying to access")
          });
          });
        }
        }); 
      }
    )
  }


  ngOnDestroy(): void {
    if(this.foodMenuFetch$){
      this.foodMenuFetch$.unsubscribe();
    }
    if(this.getFoodPicture$){
      this.getFoodPicture$.unsubscribe();
    }
    if(this.navbarCollapse$){
      this.navbarCollapse$.unsubscribe();
    }
  }
}
