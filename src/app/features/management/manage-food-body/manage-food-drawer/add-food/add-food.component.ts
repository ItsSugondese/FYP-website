import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { textFiledWhenClick } from 'src/app/shared/class/tailwind/hover-text-field';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';
import { SnackbarService } from 'src/app/templates/snackbar/snackbar-service/snackbar.service';
import { MessageStatus } from 'src/app/templates/snackbar/snackbar.template.component';
import { ManageFoodsService } from '../../manage-foods/manage-foods-service/manage-foods.service';
import { FoodMenuWithImageData, foodMenu } from '../../manage-foods/manage-foods-service/model/food-menu.model';
import { ManageFoodsComponent } from '../../manage-foods/manage-foods.component';
import { AddFoodService } from './add-food-service/add-food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit, OnDestroy {


  @Output() onOpeningDrawer: EventEmitter<boolean> = new EventEmitter();
  @Input() item !: FoodMenuWithImageData | null
  @Output() sendHaveSaved: EventEmitter<boolean> = new EventEmitter();


  hoverField = textFiledWhenClick()
  isOffcanvasOpen = false;
  imageUrl!: string | null;
  postFoodMenu$ !: Subscription;
  foodTypeSubscribable$ !: Subscription

  foodForm : FormGroup = this.formBuilder.group({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]), // Validation added for name
    description: new FormControl(''), // No validation for description
    cost: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Validation added for cost
    photoId: new FormControl(),
    foodType: new FormControl('', [Validators.required]),
    isAuto: new FormControl('', [Validators.required]) // Validation added for foodType
  });
  

  imageId !: number | null;
  menuList !: string[]

  constructor(public foodService: ManageFoodsService,
    private formBuilder: FormBuilder, private enumService: EnumService, private snackbarService: SnackbarService,
     private addFoodService: AddFoodService
  ) { }


  ngOnInit(): void {


    this.foodTypeSubscribable$ = this.enumService.getFoodMenuData().subscribe(
      (response) => {
        this.menuList = response.data
      }
    )

        if (this.item != null) {
          this.foodForm.setValue({
            id: this.item.foodMenu.id,
            name: this.item.foodMenu.name,
            description: this.item.foodMenu.description,
            cost: this.item.foodMenu.cost,
            photoId: null,
            foodType: this.item.foodMenu.foodType,
            isAuto: this.item.foodMenu.isAuto
          })
          this.imageUrl = this.item.image
        }else{
          this.foodForm.reset();
          this.imageUrl = null;
        }
      
  }

 
  
  selectedDropdownOption(option: string) {
    this.formValue("foodType")?.setValue(option);
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
    this.foodForm.reset();
    if (this.isOffcanvasOpen == true) {
    } else {
      this.imageUrl = null;
    }
  }
  

  submitDetails() {
    if (this.imageId) {
      const photoIdControl = this.foodForm.get('photoId');
      photoIdControl?.setValue(this.imageId);
    }
    
    let tempFoodType !: string;
    const foodType = this.foodForm.get('foodType');
    tempFoodType =  foodType?.value;
    foodType?.setValue(tempFoodType.toUpperCase());

    this.postFoodMenu$ = this.foodService.postFoodMenu(this.foodForm.value).subscribe(
      (results: ResponseData<null>) => {
        if(results.status == true){
          this.toggleDrawer(false)
          this.addFoodService.setIsSaved(true)
        }else{
        this.postFoodMenu$.unsubscribe();
        }
      }
    );

    foodType?.setValue(tempFoodType)
  }



  compareFormAndMenu():boolean {
   
    if(this.item?.foodMenu.cost == this.formValue('cost')!.value &&
    this.item?.foodMenu.name.toUpperCase() == this.formValue('name')!.value.toUpperCase() &&
    this.item?.foodMenu.foodType.toUpperCase() == this.formValue('foodType')!.value.toUpperCase() &&
    this.item?.foodMenu.description.toUpperCase() == this.formValue('description')!.value.toUpperCase() &&
    this.item?.foodMenu.isAuto == this.formValue('isAuto')!.value) {
      return true;
    }
    
    return false;
  }

  formValue(name: string) {
    return this.foodForm.get(name);
  }

  toggleDrawer(isOopen : boolean){
    this.onOpeningDrawer.emit(isOopen)
  }

  ngOnDestroy(): void {
    if (this.postFoodMenu$) {
      this.postFoodMenu$.unsubscribe()
    }

    if (this.foodTypeSubscribable$) {
      this.foodTypeSubscribable$.unsubscribe()
    }
  }
}
