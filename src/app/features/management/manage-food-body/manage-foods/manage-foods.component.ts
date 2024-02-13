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

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent implements OnInit, OnDestroy{

  @Output() onOpeningDrawer : EventEmitter<boolean> = new EventEmitter();


  toggleDrawer(isOopen : boolean){
    this.onOpeningDrawer.emit(isOopen)
  }


  foodFilter = FoodFilter
  searchData!: string;
  // screenWidth!: number;
  // screenWidth$ !: Subscription;
  navbarCollapse$ !: Subscription;
  collapsed !: boolean;
  numberOfItemsPerRow = 3;
  imageUrl!: string | null; //

  items: any[] = [{}];
  imageId$ !: Subscription;
  imageId !: number; //

  foodMenuFetch$ !: Subscription;
  foodMenu : foodMenu[] = [];
  postFoodMenu$ !: Subscription; //
  getFoodPicture$ !: Subscription;
  id !: number;
  imageDataMap: { [key: number]: string } = {};
  
  foodMenuPagination : FoodMenuPagination = {
    page: 1,
    row: 10
  }

  foodForm : FormGroup =this.formBuilder.group({
    id : new FormControl(),
  name: new FormControl(),
  description: new FormControl(),
  cost: new FormControl(),
  photoId: new FormControl(),
  foodType : new FormControl()
  });


  
  selectedDropdownOption(option: string) {
    this.formValue("foodType")?.setValue(option);
  }

  constructor(private foodService : ManageFoodsService,
    private formBuilder : FormBuilder, private router: Router,
    private sideNavService: SidenavService, private enumService: EnumService
    ) {}

    selectedNum !: number

  selectOption(id: number) {
    this.selectedNum = id
    console.log(this.selectedNum)
  }


 

  ngOnInit(): void {
    this.selectedNum = 1;
    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });

 
    // this.foodMenuFetch$ = this.foodService.getFoodMenu().subscribe(
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

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }



  onFileSelected(event: any) {
    const files : FileList = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('attachments', file);
      }

      this.imageId$ = this.foodService.postImage(formData).subscribe(
        (response) => {
          this.imageId = response.data[0];
          this.imageId$.unsubscribe()
          
        }
      )

    }
  }

  submitDetails(){
    
    
    if(this.imageId){
    const photoIdControl = this.foodForm.get('photoId');
    photoIdControl?.setValue(this.imageId);
    }


    this.postFoodMenu$ = this.foodService.postFoodMenu(this.foodForm.value).subscribe(
      (results) => {
        console.log(results);
        this.postFoodMenu$.unsubscribe();
      }
    );

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






  
formValue(name : string) {
  return this.foodForm.get(name);
}

 




  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe();
    }
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
