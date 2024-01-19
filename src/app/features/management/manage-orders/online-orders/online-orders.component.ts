import { Component, OnDestroy, OnInit } from '@angular/core';
import { onlineOrder } from './online-orders-service/model/online-order-interface';
import { Subscription } from 'rxjs';
import { OnlineOrdersService } from './online-orders-service/online-orders.service';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { onlineOrderPagination } from './online-orders-service/model/online-orders-payload.model';
declare var $: any;

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.scss']
})
export class OnlineOrdersComponent implements OnInit, OnDestroy {

  onlineOrderList !: onlineOrder[]
  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 1,
  }
  paginationJson !: onlineOrderPagination
  fromTime = new Date();
  getOrderSubscriable$ !: Subscription

  tableSizes = [5, 10, 15, 20]
  constructor(private onlineOrdersService: OnlineOrdersService) {

  }
  


  ngOnInit(): void {
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
  }


  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);

  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
    }
    console.log(this.paginationNavigator.row)
  }



  setAndGetPaginationJson(page: number, row: number) {
    return this.paginationJson = {
      row: row,
      page: page,
      fromTime: "00:00:00",
      toTime: "23:59:59"
    }
  }

  getPaginatedData(page: number, row: number) {
    this.getOrderSubscriable$ = this.onlineOrdersService.getData(
      this.setAndGetPaginationJson(page, row)).subscribe(
        (response) => {
          this.onlineOrderList = response.data.content
          this.paginationNavigator.totalNoOfElements = response.data.totalElements
          this.paginationNavigator.totalNoOfpage = response.data.totalPages
          this.paginationNavigator.noOfElements = response.data.numberOfElements
        }
      )
  }

  ngOnDestroy(): void {
    if(this.getOrderSubscriable$){
      this.getOrderSubscriable$.unsubscribe();
    }
  }
}
