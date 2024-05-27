import { Injectable } from '@angular/core';
import { Message, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client'
import { Subscription } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { environment } from 'src/environments/environment';
import { RevenueData } from 'src/app/features/dashboard/dashboard-service/model/revenue-data.model';
import { TableData } from 'src/app/features/dashboard/dashboard-service/model/table-data.model';
import { FoodMenuData } from 'src/app/features/dashboard/dashboard-service/model/food-menu-data.model';
import { UsersData } from 'src/app/features/dashboard/dashboard-service/model/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  backendUrl : string = environment.apiUrl
  
  connection: boolean = false;

  stompClient: any

  notificationCountTopic : string = "/user/topic/notification";
  revenueDataTopic : string = "/topic/revenue";
  orderDataTopic : string = "/topic/ping/order";
  tableDataTopic : string = "/topic/table";
  foodMenuDataTopic : string = "/topic/food-menu";
  salesDataTopic : string = "/topic/sales-data";
  usersDataTopic : string = "/topic/users";


  notificationNumberSubject = new Subject<number>();
  revenueSubject = new Subject<RevenueData>();
  tableSubject = new Subject<TableData>();
  orderSubject = new Subject<boolean>();
  foodMenuSubject = new Subject<FoodMenuData>();
  userDataSubject = new Subject<UsersData>();
  salesDataSubject = new Subject<boolean>();
  // messageSubscription !: Subscription;

  messageNotification = new Subject<any>();
  messageTyping = new Subject<any>();

  webSocketEndPoint: string = `${this.backendUrl}ws?userId=${this.userService.getUserId()}`;

  constructor(private userService : UserService){

  }

  connect() {
    console.log("initalize  websocket connection");
    let ws = SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frames: any) {
  
      if(_this.userService.getSingleRole() == 'ADMIN'){
        // for table data
        _this.stompClient.subscribe(_this.tableDataTopic, function (tableDataResponse: any) {
          _this.onTableDataReceived(tableDataResponse);
        });

        // for sales data 
        _this.stompClient.subscribe(_this.salesDataTopic, function (salesDataResponse: any) {
          _this.onSalesDataReceived(salesDataResponse);
        });
        // for sales data 
        _this.stompClient.subscribe(_this.usersDataTopic, function (userDataResponse: any) {
          console.log("here")
          _this.onUserDataReceived(userDataResponse);
        });
      }

      if(_this.userService.getSingleRole() == 'ADMIN' || _this.userService.getSingleRole() == 'STAFF'){

        // for revenue data
        _this.stompClient.subscribe(_this.revenueDataTopic, function (revenueDataResponse: any) {
          _this.onRevenueDataReceived(revenueDataResponse);
        });

        // for order data
        _this.stompClient.subscribe(_this.orderDataTopic, function (orderDataResponse: any) {
          _this.onOrderDataReceived(orderDataResponse);
        });

        // for food menu data
        _this.stompClient.subscribe(_this.foodMenuDataTopic, function (foodMenuDataResponse: any) {
          _this.onFoodMenuDataReceived(foodMenuDataResponse);
        });
      }

      // for notififcation count 
      _this.stompClient.subscribe(_this.notificationCountTopic, function (notificaitonResponse: any) {
        _this.onNotificationCountReceived(notificaitonResponse);
      });

    }, this.errorCallBack);
    if (SockJS.OPEN) {
      this.connection = true;
    }
  };




  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  errorCallBack(error: any) {
    console.log("error ma xu hai ta")
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }


  onNotificationCountReceived(message: any) {
    const obj = JSON.parse(message.body) as number
    this.notificationNumberSubject.next(obj);
  }

  onRevenueDataReceived(message: any) {
    const obj = JSON.parse(message.body) as RevenueData
    this.revenueSubject.next(obj);
  }
  onTableDataReceived(message: any) {
    const obj = JSON.parse(message.body) as TableData
    this.tableSubject.next(obj);
  }
  onOrderDataReceived(message: any) {
    const obj = JSON.parse(message.body) as boolean
    this.orderSubject.next(obj);
  }
  onSalesDataReceived(message: any) {
    const obj = JSON.parse(message.body) as boolean
    this.orderSubject.next(obj);
  }
  onFoodMenuDataReceived(message: any) {
    const obj = JSON.parse(message.body) as FoodMenuData
    this.foodMenuSubject.next(obj);
  }
  onUserDataReceived(message: any) {
    const obj = JSON.parse(message.body) as UsersData
    this.userDataSubject.next(obj);
  }
}
