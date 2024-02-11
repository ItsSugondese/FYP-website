import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ManageFoodsService } from './manage-foods-service/manage-foods.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { FoodFilter } from 'src/app/constant/filter/food-filter.model';
import { foodMenu } from './manage-foods-service/model/food-menu.model';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent implements OnInit, OnDestroy{

  foodFilter = FoodFilter
  searchData!: string;
  // screenWidth!: number;
  // screenWidth$ !: Subscription;
  navbarCollapse$ !: Subscription;
  collapsed !: boolean;
  numberOfItemsPerRow = 3;

  isSwitchChecked: boolean = false;
  items: any[] = [{}];
  imageId$ !: Subscription;
  imageId !: number;

  foodMenuFetch$ !: Subscription;
  foodMenu : foodMenu[] = [];
  postFoodMenu$ !: Subscription;
  getFoodPicture$ !: Subscription;
  id !: number;
  imageDataMap: { [key: number]: string } = {};
  foodTypeSubscribable$ !: Subscription
  menuList !: string[]
  

  foodForm : FormGroup =this.formBuilder.group({
    id : new FormControl(),
  name: new FormControl(),
  description: new FormControl(),
  cost: new FormControl(),
  isPackage: new FormControl(),
  photoId: new FormControl(),
  });

  selectedOption !: string
  
  selectedDropdownOption(option: string) {
    this.selectedOption = option;
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

 
    this.foodMenuFetch$ = this.foodService.getFoodMenu().subscribe(
      (response) => {
        this.foodMenu = response.data;
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

    this.foodTypeSubscribable$ = this.enumService.getFoodMenuData().subscribe(
      (response) => {
        this.menuList = response.data
      }
    )
    
  }

 





 

 



  isOffcanvasOpen = true;
  // isOffcanvasOpen = false;
  
  toggleOffcanvas() {
    console.log(this.foodForm.get("id")?.value)
    console.log(this.foodForm.get("id") === null)
    console.log(this.foodForm.value);
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
    while(this.menuFormGroups.length){
      this.menuFormGroups.removeAt(0);
    }
    this.foodForm.reset();
    if(this.isOffcanvasOpen == true){
      
    }else{
      this.isSwitchChecked = false;
      
      
    }

 
    
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

  
  
  
  
toggleFormToEdit(item : foodMenu){
    this.toggleOffcanvas();
    console.log(this.menuFormGroups.length)
    
    this.isSwitchChecked = item.isPackage;
    
   
    this.foodForm.setValue({
      id : item.id,
  name: item.name,
  description: item.description,
  cost: item.cost,
  isPackage: item.isPackage,
  photoId: item.photoId,
    })
}


  
  

  get menuFormGroups () {
    return this.foodForm.get('menuItems') as FormArray
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
    // if(this.screenWidth$){
    //   this.screenWidth$.unsubscribe();
    // }
  }
}
