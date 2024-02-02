import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ManageFoodsService, foodMenu } from './manage-foods-service/manage-foods.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { FoodFilter } from 'src/app/constant/filter/food-filter.model';

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent implements OnInit, OnDestroy, AfterViewInit {

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

  

  foodForm : FormGroup =this.formBuilder.group({
    id : new FormControl(),
  name: new FormControl(),
  description: new FormControl(),
  cost: new FormControl(),
  isPackage: new FormControl(),
  photoId: new FormControl(),
  menuItems : new FormArray([
    this.formBuilder.control('')
    // new FormControl()
  ])
  });

  
  


  constructor(private foodService : ManageFoodsService,
    private formBuilder : FormBuilder, private router: Router,
    private sideNavService: SidenavService
    ) {}

    selectedNum !: number
  selectOption(id: number) {
    this.selectedNum = id
    console.log(this.selectedNum)
  }

  // getNumberNonCollpase() : number{
  //   if(this.screenWidth > 1400){
  //     console.log(4)
  //     return 4
  //   }else if(this.screenWidth < 1393 && this.screenWidth >= 1105){
  //     console.log(this.screenWidth)
  //     console.log(3)
  //     return 3
  //   }else if(this.screenWidth < 1105 && this.screenWidth >= 817){
  //     console.log(2)
  //     return 2;
  //   }else if(this.screenWidth < 817){
  //     console.log(1)
  //     return 1;
  //   }else{
  //     return 1;
  //   }
  // }
  // getNumberCollpase() : number{
  //   if(this.screenWidth > 1520){
  //     return 5
  //   }else if(this.screenWidth < 1473 && this.screenWidth >= 1217){
  //     return 4
  //   }else if(this.screenWidth < 1217 && this.screenWidth >= 897){
  //     return 3;
  //   }else if(this.screenWidth < 897 && this.screenWidth >= 641){
  //     return 2;
  //   }else if(this.screenWidth < 641){
  //     return 1;
  //   }else{
  //     return 1;
  //   }
  // }
  

  // checkAndReturnIfFit(isCollapse: boolean, colSpan: number) :boolean{
  //   if(this.collapsed == isCollapse && (this.collapsed == true? this.getNumberCollpase() == colSpan :  this.getNumberNonCollpase() == colSpan)){
  //     console.log(colSpan + ": " + true + ", " + isCollapse + ", " + this.getNumberCollpase())
  //     return true;
  //   }else{
  //     // console.log(false)
  //     return false;
  //   }
  // }

  ngAfterViewInit() {
    // Now containers is a QueryList of all the elements with the 'container' reference
   
  }

  ngOnInit(): void {
    this.selectedNum = 1;
    this.navbarCollapse$ =  this.sideNavService.getCollapsed().subscribe((collapsed) => {
      this.collapsed = collapsed;
    });

    // this.screenWidth$ =  this.sideNavService.getScreenResize().subscribe((resize) => {
    //   this.screenWidth = resize;
    //   if(this.collapsed){
    //     this.getNumberCollpase()
    //   }else{
    //     this.getNumberNonCollpase()
    //   }
    //   console.log(this.screenWidth)
    // });
    
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

    
  }

 





  resetSwitch() {
    this.isSwitchChecked = !this.isSwitchChecked;
    if(this.isSwitchChecked && this.menuFormGroups.length<1){
      this.menuFormGroups.push(new FormControl());
    }
   
  }

  addItem() {
    // Add a new item to the array
    this.menuFormGroups.push(new FormControl());
  }

  removeItem(index: number) {
    this.menuFormGroups.removeAt(index)
    if(this.menuFormGroups.length < 1){
      this.isSwitchChecked = false;
    }
  }

  isOffcanvasOpen = false;
  
  toggleOffcanvas() {
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

    console.log(this.isOffcanvasOpen)
    
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
    
    (this.foodForm.get('isPackage'))?.setValue(this.isSwitchChecked)
    if(this.imageId){
    const photoIdControl = this.foodForm.get('photoId');
    photoIdControl?.setValue(this.imageId);
    }

    const filteredForm = this.filterNullValues(this.foodForm.value);

    this.postFoodMenu$ = this.foodService.postFoodMenu(filteredForm).subscribe(
      (results) => {
        console.log(results);
        this.postFoodMenu$.unsubscribe();
      }
    );

    console.log(filteredForm);
  }

  filterNullValues(obj: any) {
    const filtered: { [key: string]: any } = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          const filteredArray = obj[key].filter((item: any) => item !== null);
          if (filteredArray.length > 0) {
            filtered[key] = filteredArray;
          }
        } else if (obj[key] !== null) {
          filtered[key] = obj[key];
        }
      }
    }
  
    // Check if menuItems is null or empty and set isPackage to false
    if (!filtered['menuItems'] || filtered['menuItems'].length === 0) {
      filtered['isPackage'] = false;
    }
  
    return filtered;
  }
  
  
// toggleFormToEdit(item : foodMenu){
//     this.toggleOffcanvas();
//     console.log(this.menuFormGroups.length)
//     for(let i=this.menuFormGroups.length; i<item.menuItems.length; i++){
//       console.log(i);
//       this.addItem();
//     }
//     this.isSwitchChecked = item.isPackage;
    
   
//     this.foodForm.setValue({
//       id : item.id,
//   name: item.name,
//   description: item.description,
//   cost: item.cost,
//   isPackage: item.isPackage,
//   photoId: item.photoId,
//   menuItems : item.menuItems
//     })
// }

  toggleFormToEdit(item : foodMenu){
    this.router.navigate(['/feedback/', item.id])
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
