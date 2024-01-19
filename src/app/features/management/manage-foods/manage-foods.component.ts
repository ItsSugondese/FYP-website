import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageFoodsService, foodMenu } from './manage-foods-service/manage-foods.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';

@Component({
  selector: 'app-manage-foods',
  templateUrl: './manage-foods.component.html',
  styleUrls: ['./manage-foods.component.scss']
})
export class ManageFoodsComponent implements OnInit, OnDestroy {
  isSwitchChecked: boolean = false;
  items: any[] = [{}];
  imageId$ !: Subscription;
  imageId !: number;

  foodMenuFetch$ !: Subscription;
  foodMenu !: foodMenu[];
  postFoodMenu$ !: Subscription;
  getFoodPicture$ !: Subscription;
  id !: number;
  imageDataMap: { [key: number]: string } = {};

  foodForm = this.formBuilder.group({
    id : new FormControl(),
  name: new FormControl(),
  description: new FormControl(),
  cost: new FormControl(),
  isPackage: new FormControl(),
  photoId: new FormControl(),
  menuItems : new FormArray([
    new FormControl()
  ])
  })

  

  constructor(private foodService : ManageFoodsService,
    private formBuilder : FormBuilder) {
    
  }
  

  ngOnInit(): void {
    this.foodMenuFetch$ = this.foodService.getFoodMenu().subscribe(

      (response) => {
        this.foodMenu = response.data;
        this.foodMenu.forEach((foodMenu) => {
          if(foodMenu.photoId){
            this.getFoodPicture$ = this.foodService.getFoodPicture(foodMenu.photoId).subscribe((imageBlob: Blob) => {


            createImageFromBlob(imageBlob, foodMenu.photoId)
             .then((imageData) => {
              this.imageDataMap[foodMenu.photoId] = imageData;
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
  
  
  toggleFormToEdit(item : foodMenu){
    this.toggleOffcanvas();
    console.log(this.menuFormGroups.length)
    for(let i=this.menuFormGroups.length; i<item.menuItems.length; i++){
      console.log(i);
      this.addItem();
    }
    this.isSwitchChecked = item.isPackage;
    
   
    this.foodForm.setValue({
      id : item.id,
  name: item.name,
  description: item.description,
  cost: item.cost,
  isPackage: item.isPackage,
  photoId: item.photoId,
  menuItems : item.menuItems
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
  }
}
