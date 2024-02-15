import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { textFiledWhenClick } from 'src/app/shared/class/tailwind/hover-text-field';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';
import { SnackbarService } from 'src/app/templates/snackbar/snackbar-service/snackbar.service';
import { MessageStatus } from 'src/app/templates/snackbar/snackbar.template.component';
import { ManageFoodsService } from '../../manage-foods/manage-foods-service/manage-foods.service';
import { FoodMenuWithImageData } from '../../manage-foods/manage-foods-service/model/food-menu.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit, OnDestroy {


  @Output() onOpeningDrawer: EventEmitter<boolean> = new EventEmitter();
  @Input() item !: FoodMenuWithImageData | null


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
    foodType: new FormControl('', [Validators.required]) // Validation added for foodType
  });
  
  imageId$ !: Subscription;

  imageId !: number | null;
  menuList !: string[]
  imageDataMapByMenuId: { [key: number]: string[] } = {};

  selectedFoodImage : string| null = null

  constructor(public foodService: ManageFoodsService,
    private formBuilder: FormBuilder, private enumService: EnumService, private snackbarService: SnackbarService
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
            foodType: this.item.foodMenu.foodType
          })
          this.imageUrl = this.item.image
          this.selectedFoodImage = this.item.image
        }else{
          this.foodForm.reset();
          this.imageUrl = null;
          this.selectedFoodImage = null
        }
      
  }

  removeImage(event: MouseEvent): void {
    if(this.item != null){
      this.imageUrl = this.item.image
    }else{
    this.imageUrl = null;
    }
    this.imageId = null;


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

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.uploadFiles(event.dataTransfer!.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelect(event: Event) {
    console.log("here is it")
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) {
      this.uploadFiles(input.files!);
    }
  }

  uploadFiles(files: FileList) {
    // For simplicity, assuming only one file is selected
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        const formData = new FormData();
        formData.append('attachments', file);
        this.imageId$ = this.foodService.postImage(formData).subscribe(
          (response) => {
            this.imageId = response.data[0];
            this.imageId$.unsubscribe()
            
          }
        )
      };
      reader.readAsDataURL(file);
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

    console.log("hello")
    this.postFoodMenu$ = this.foodService.postFoodMenu(this.foodForm.value).subscribe(
      (results: ResponseData<null>) => {
        if(results.status == true){
          this.snackbarService.showMessage({
            label : results.message,
            status : MessageStatus.SUCCESS
          });
          this.toggleDrawer(false)
        }else{
          this.snackbarService.showMessage({
            label : results.message,
            status : MessageStatus.FAIL
          });
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
    this.item?.foodMenu.description.toUpperCase() == this.formValue('description')!.value.toUpperCase()) {
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
    if(this.imageId$){
      this.imageId$.unsubscribe()
    }
  }
}
