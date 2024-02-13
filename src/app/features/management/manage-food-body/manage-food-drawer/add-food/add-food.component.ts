import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EnumService } from 'src/app/shared/service/enum-service/enum.service';
import { Subscription } from 'rxjs';
import { ManageFoodsService } from '../../manage-foods/manage-foods-service/manage-foods.service';
import { textFiledWhenClick } from 'src/app/shared/class/tailwind/hover-text-field';
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
  // selectedFoodMenuSubscribable$ !: Subscription
  foodForm !: FormGroup
  imageId !: number;
  menuList !: string[]
  imageDataMapByMenuId: { [key: number]: string[] } = {};

  selectedFoodImage : string| null = null

  constructor(private foodService: ManageFoodsService,
    private formBuilder: FormBuilder, private enumService: EnumService
  ) { }


  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      cost: new FormControl(),
      photoId: new FormControl(),
      foodType: new FormControl()
    });

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
            photoId: this.item.foodMenu.photoId,
            foodType: this.item.foodMenu.foodType
          })
          this.imageUrl = this.item.image
          this.selectedFoodImage = this.item.image
        }else{
          this.foodForm.reset();
          this.imageUrl = null;
          this.selectedFoodImage = null
        }
      
    // this.selectedFoodMenuSubscribable$ = this.foodService.getSelectedFoodMenu().subscribe(
    //   (item) => {
    //     if (item != null) {
    //       this.foodForm.setValue({
    //         id: item.foodMenu.id,
    //         name: item.foodMenu.name,
    //         description: item.foodMenu.description,
    //         cost: item.foodMenu.cost,
    //         photoId: item.foodMenu.photoId,
    //         foodType: item.foodMenu.foodType
    //       })
    //       this.imageUrl = item.image
    //       this.selectedFoodImage = item.image
    //     }else{
    //       this.foodForm.reset();
    //       this.imageUrl = null;
    //       this.selectedFoodImage = null
    //     }
    //   }
    // )
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
      };
      reader.readAsDataURL(file);
    }
  }

  submitDetails() {


    if (this.imageId) {
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




  formValue(name: string) {
    return this.foodForm.get(name);
  }

  ngOnDestroy(): void {
    if (this.postFoodMenu$) {
      this.postFoodMenu$.unsubscribe()
    }

    if (this.foodTypeSubscribable$) {
      this.foodTypeSubscribable$.unsubscribe()
    }
    console.log("check if getting called")
  }
}
