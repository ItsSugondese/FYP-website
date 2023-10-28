import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageFoodsService } from './manage-foods-service/manage-foods.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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


  postFoodMenu$ !: Subscription;
  id !: number;


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
          debugger;
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

    this.postFoodMenu$ = this.foodService.postFoodMenu(this.foodForm).subscribe(
      (results) => {
        console.log(results);
        this.postFoodMenu$.unsubscribe();
      }
    );
  }

  get menuFormGroups () {
    return this.foodForm.get('menuItems') as FormArray
  }



  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe();
    }
  }
}
