import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ManageOrdersNavbarService } from '../manage-orders-navbar/manage-orders-navbar-service/manage-orders-navbar.service';
import { Subscription, timeInterval } from 'rxjs';
import { EnumItem } from '@shared/model/enums/MapForEnum.model';
import { extend } from 'jquery';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { OnsiteOrdersService } from '../onsite-orders/onsite-orders-service/onsite-orders.service';
import { OnlineOrdersService } from '../online-orders/online-orders-service/online-orders.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { SummaryPayload } from '../online-orders/online-orders-service/model/online-orders-payload.model';
import { SummaryData } from '../online-orders/online-orders-service/model/online-order-interface';
// import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import * as moment from 'moment';
import { ManageFoodsService } from '../../manage-food-body/manage-foods/manage-foods-service/manage-foods.service';


enum OrderNav{
  ONSITE = "Onsite",
  ONLINE = "Online"
}

@Component({
  selector: 'app-order-management-body',
  templateUrl: './order-management-body.component.html',
  styleUrls: ['./order-management-body.component.scss']
})
export class OrderManagementBodyComponent extends CommonVariable implements OnInit, OnDestroy{

   searchText : string | undefined 
   updatedSelected : boolean = true
   summaryPopUp = false

   startTime !: string;
  endTime !: string;

  fetchSummary$ !: Subscription
  summaryData !: SummaryData[]
  getFoodPicture$ !: Subscription;
  imageDataMap: { [key: number]: string } = {};



  constructor(public managementNavbarService: ManageOrdersNavbarService, public onsiteOrdersService: OnsiteOrdersService ,
    public onlineOrderService: OnlineOrdersService, private foodService: ManageFoodsService
    ){
    super()
  }

  ngOnInit(): void {
    this.setTimeForFilter()
  }

  showSummaryPopUp(){
    this.summaryPopUp = true
    this.getSummaryBackend()
  }

  onTimeChange(){
    if(this.timeChecker()){
      this.getSummaryBackend()
    }
  }

  timeChecker() : boolean{
    if(this.startTime.trim() == '' || this.endTime.trim()== ''){
      return false
    }
    const startTimeMoment = moment(this.startTime, 'HH:mm');
const endTimeMoment = moment(this.endTime, 'HH:mm');

if (startTimeMoment.isAfter(endTimeMoment)) {
  return false;
} 
  return true
  }

  
  selectedOrderTypeToFilter(event: string ){
    this.onsiteOrdersService.selectedOption = event!
    this.updatedSelected = !this.updatedSelected;
  }

  typedOrderToFilter(event: string){
    console.log(event)
    if(event.trim() == ''){
      this.searchText = undefined
    }else{
      this.searchText = event
    }
    
    console.log(this.searchText)
  }
  
  setTimeForFilter(){
    const currentTime = new Date();
    this.startTime = this.formatTime(currentTime);
    
    currentTime.setMinutes(currentTime.getMinutes() + 30);
    this.endTime = this.formatTime(currentTime);
  }

  formatTime(time: Date): string {
    const hours = ('0' + time.getHours()).slice(-2);
    const minutes = ('0' + time.getMinutes()).slice(-2);
    return hours + ':' + minutes;
  }

  getSummaryBackend(){
    const payload : SummaryPayload = {
      fromTime : this.startTime,
      toTime : this.endTime
    }
    this.fetchSummary$ = this.onlineOrderService.summarize(payload).subscribe(
      (res) => {
        this.summaryData = res.data

        this.summaryData.forEach((menu) => {
          if(menu.photoId){
            this.getFoodPicture$ = this.foodService.getFoodPicture(menu.photoId).subscribe((imageBlob: Blob) => {


            this.createImageFromBlob(imageBlob, menu.photoId)
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

  ngOnDestroy(): void {
      if(this.fetchSummary$){
        this.fetchSummary$.unsubscribe()
      }

      if(this.getFoodPicture$){
        this.getFoodPicture$.unsubscribe()
      }
  }
  

}
