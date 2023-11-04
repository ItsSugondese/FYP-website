import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { foodMenu, foodOrdering } from 'src/app/interface';
import { HomepageService } from './homepage-service/homepage.service';
import { ManageFoodsService } from '../../staff/manage-foods/manage-foods-service/manage-foods.service';
import { createImageFromBlob } from 'src/app/helper/attachment-helper/attachment.handler';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  getFoodItems$ !: Subscription
  getFoodPicture$ !: Subscription
  foodMenuList !: foodMenu[]
  imageDataMap: { [key: number]: string } = {};
  selectedFoodMenu !: foodMenu;
  selectedImageDataMap !: string

  showPopUp = false;
  finalPopUp = false;
  quantity = 0;

  quantityControl = new FormControl(1, Validators.min(1));
  foodOrderList: foodOrdering[] = []

  arrivalTime : string = '';
  @ViewChild('quantityInput') quantityInput !: ElementRef;

  constructor(private homepageService: HomepageService,
    private foodService: ManageFoodsService
  ) {

  }

  ngOnInit(): void {
    this.getFoodItems$ = this.loadFoodMenusAndImage();
  }

  visible: boolean = false;
  position: any = 'top-right';

  
  
  
  //actions effecting dialog
  toogleVisibility() {
    this.visible = !this.visible;
  }

  selectedOrder(menu: foodMenu, quantity: number) {
    this.togglePopUp();
    let found = false;
    for (let i = 0; i < this.foodOrderList.length; i++) {
      if (this.foodOrderList[i].selectedFoodMenu.id === menu.id) {
        found = true;
        this.foodOrderList[i].quantity = quantity;
        break;
      }
    }

    if (!found) {
      this.foodOrderList.push({
        quantity: quantity,
        imageSrc : this.imageDataMap[menu.photoId],
        selectedFoodMenu : menu
      })
    }
  }

  removeOrderItem(i : number, location : string){
    this.foodOrderList.splice(i,1);
    if(location.toUpperCase() === 'finalOrder'.toUpperCase()){
      if(this.foodOrderList.length < 1){
        this.finalPopUp = !this.finalPopUp
      }
    }
  }
  
  
  //action effecting first modal
  togglePopUp() {
    this.showPopUp = !this.showPopUp
    if (!this.showPopUp) {
      this.quantity = 0
    }
    if (!this.visible) {
      this.toogleVisibility();
    }
  }
  
  orderPopUp(foodMenu: foodMenu) {
    this.togglePopUp();

    console.log(this.showPopUp)
    if (this.showPopUp) {
      this.selectedFoodMenu = foodMenu;
      this.selectedImageDataMap = this.imageDataMap[foodMenu.photoId];
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  //action effecting last modal
  toggleFinalPopUp() {
    this.finalPopUp = !this.finalPopUp

    if (!this.visible) {
      this.toogleVisibility();
    }
  }

  orderItemScreen(orderList : foodOrdering[]) {
    this.toggleFinalPopUp();
    
    if (this.finalPopUp) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  onEnterPress(event: any, i : number) {
    this.quantityInput.nativeElement.blur();
    if ((event.target.value) > 0) {
      this.foodOrderList[i].quantity = event.target.value
    }else{
      this.foodOrderList[i].quantity =  1
    }
  }
  onInputBlur(i : number){
    if(this.foodOrderList[i].quantity ==0){
      this.foodOrderList[i].quantity = 1
    }
  }
  
  getOneReturn(i : number){
    return this.foodOrderList[i].quantity = 1;
  }

  //others

  loadFoodMenusAndImage() {
    return this.homepageService.getFoodMenu().subscribe(
      (response) => {
        this.foodMenuList = response.data;
        console.log(this.foodMenuList)
        this.foodMenuList.forEach((foodMenu) => {
          if (foodMenu.photoId) {
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


  ngOnDestroy(): void {
    if (this.getFoodItems$) {
      this.getFoodItems$.unsubscribe();
    }
  }

}
