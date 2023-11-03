import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { foodMenu, foodOrdering } from 'src/app/interface';
import { HomepageService } from './homepage-service/homepage.service';
import { ManageFoodsService } from '../../staff/manage-foods/manage-foods-service/manage-foods.service';
import { createImageFromBlob } from 'src/app/helper/attachment-helper/attachment.handler';



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
  quantity = 0;

  foodOrderList: foodOrdering[] = []

  constructor(private homepageService: HomepageService,
    private foodService: ManageFoodsService
  ) {

  }

  ngOnInit(): void {
    this.getFoodItems$ = this.loadFoodMenusAndImage();
  }

  visible: boolean = false;
  position: any = 'top-right';

  toogleVisibility() {
    this.visible = !this.visible;
  }


  selectedOrder(menu: foodMenu, quantity: number) {
    
    this.togglePopUp();
    let found = false;
    for (let i = 0; i < this.foodOrderList.length; i++) {
      if (this.foodOrderList[i].foodId === menu.id) {
        found = true;
        this.foodOrderList[i].quantity = quantity;
        break;
      }
    }

    if (!found) {
      this.foodOrderList.push({
        foodName: menu.name,
        foodId: menu.id,
        quantity: quantity
      })
    }
  }

  removeOrderItem(i : number){
  
    this.foodOrderList.splice(i,1);
  }

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


    if (this.showPopUp) {
      this.selectedFoodMenu = foodMenu;
      this.selectedImageDataMap = this.imageDataMap[foodMenu.photoId];
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  makeOrder(foodMenu: foodMenu, amount: number) {
    this.togglePopUp();


    if (this.showPopUp) {
      this.selectedFoodMenu = foodMenu;
      this.selectedImageDataMap = this.imageDataMap[foodMenu.photoId];
      this.visible = false;
    } else {
      this.visible = true;
    }
  }


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
