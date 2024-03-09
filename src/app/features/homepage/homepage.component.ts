import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomepageService } from './homepage-service/homepage.service';
import { FormControl, Validators } from '@angular/forms';
import { foodOrderPayload, onlineOrderPayload } from 'src/app/payload.interface';
import { createImageFromBlob } from 'src/app/shared/helper/attachment-helper/attachment.handler';
import { foodMenu } from 'src/app/shared/model/food/food.model';
import { foodOrdering } from 'src/app/shared/model/order/food-order.model';
import { UserOrderService } from '../user-order/user-order-service/user-order.service';
import { FoodFilter } from 'src/app/constant/filter/food-filter.model';
import { Router } from '@angular/router';
import { UserRouteConstant } from 'src/app/constant/routing/user-routing-constant.model';
import { UserOrderHistory } from '../user-order/user-order-service/model/user-order.model';
import { ManageFoodsService } from '../management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { FoodMenuPagination } from '../management/manage-food-body/manage-foods/manage-foods-service/model/food-menu.payload';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends CommonVariable implements OnInit, OnDestroy, AfterViewInit {
  foodMenuFetch$ !: Subscription
  getFoodPicture$ !: Subscription
  foodMenuList !: foodMenu[]
  imageDataMap: { [key: number]: string } = {};
  selectedFoodMenu !: foodMenu;
  selectedImageDataMap !: string

  finalPopUp = false;
  quantity ?:number;

  isPostButtonActive = true;
  isOrderSuccessful = false;

  quantityControl = new FormControl(1, Validators.min(1));
  foodOrderList: foodOrdering[] = []
  removeFoodOrderList: number[] = []

  orderCode !: number;
  orderHistory ?: UserOrderHistory
  arrivalTime : string = '';
  @ViewChild('quantityInput') quantityInput !: ElementRef;
  selectedFoodMenuType : string | null = "ALL"
  foodMenuPagination : FoodMenuPagination = {
    page: 1,
    row: 10,
    filter:  'TODAY'
  }
  
  constructor(private homepageService: HomepageService,
    public foodService: ManageFoodsService, private userOrderService: UserOrderService,
    private router: Router
  ) {
super()
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 4000); // Snackbar duration
  
  }

  ngOnInit(): void {
    this.orderHistory = this.userOrderService.getOrderedMade();
    if(this.orderHistory != null){
      this.arrivalTime = this.orderHistory.arrivalTime
      this.orderHistory.orderFoodDetails.map(
        e => {
          this.foodOrderList.push({
            id :  e.id,
      quantity : e.quantity,
      imageSrc : this.imageDataMap[e.id],
      selectedFoodMenu : e.foodMenu
          })
      })
    }


    if(this.foodOrderList.length > 0){
      this.comingToEdit = true;
      this.visible= true;
    }

    this.getFoodMenu();
  }

  public getFoodMenu(){
    if(this.selectedFoodMenuType == 'ALL'){
      this.foodMenuPagination.foodType = undefined
    }else{
    this.foodMenuPagination.foodType = this.selectedFoodMenuType
    }
    
    this.foodMenuFetch$ = this.foodService.getFoodMenuPaginated(this.foodMenuPagination).subscribe(
      (response ) => {
        
        this.foodMenuList = response.data.content;

        this.foodMenuList.forEach((menu) => {
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

  selectedFromFoodFilter(event: string | null){
    this.selectedFoodMenuType = event
    this.getFoodMenu()
  }

  cancelEdit(){
    this.comingToEdit = false;
    this.router.navigate(['/' + UserRouteConstant.userOrder])
  }

  selectedNum = 1;
  foodFilter  = FoodFilter
  selectOption(id: number) {
    this.selectedNum = id
    console.log(this.selectedNum)
  }

  visible: boolean = false;
  position: any = 'top-right';


  

  comingToEdit: boolean = false;
  
  
  
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
    if(this.comingToEdit){
      const id = this.foodMenuList[i].id
      if(id != null){
      this.removeFoodOrderList.push(this.orderHistory?.orderFoodDetails[i].id!)
      }
    }
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

  //hitting backend
  postOrder(order : foodOrdering[], time : string){
    this.isPostButtonActive = false;


    let foodList : foodOrderPayload[] = [] 
    let totalPrice = 0
    order.forEach(e => { 
      totalPrice += e.selectedFoodMenu.cost * e.quantity;
       foodList.push({
      id:  e.id!,
      foodId : e.selectedFoodMenu.id,
      quantity : e.quantity 
    })
  }
    )
    let orderPayload : onlineOrderPayload = {
      id: this.orderHistory != null ? this.orderHistory.id : null,
      arrivalTime : time,
      foodOrderList : foodList,
      removeFoodId : this.removeFoodOrderList,
      totalPrice : totalPrice
    }
    this.homepageService.postOnlineOrder(orderPayload).subscribe(
      (response) => {
        if(response.status == true){
          this.orderCode = response.data.orderCode
          this.isOrderSuccessful = true
        }
      }
    )
  }



  reloadPage(){
    window.location.reload()
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
    if (this.foodMenuFetch$) {
      this.foodMenuFetch$.unsubscribe();
    }

    // this.reloadPage()
    this.foodOrderList = []
    
    
  }

}
