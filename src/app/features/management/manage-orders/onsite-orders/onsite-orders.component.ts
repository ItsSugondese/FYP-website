import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';
import { OnsiteOrdersService } from './onsite-orders-service/onsite-orders.service';
import { onsiteOrderPagination } from './onsite-orders-service/model/onsite-orders-payload.model';
import { onsiteOrder } from './onsite-orders-service/model/onsite-order-interface';

@Component({
  selector: 'app-onsite-orders',
  templateUrl: './onsite-orders.component.html',
  styleUrls: ['./onsite-orders.component.scss']
})
export class OnsiteOrdersComponent implements OnInit, OnDestroy {

  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 1,
  }
  paginationJson !: onsiteOrderPagination
  getOrderSubscriable$ !: Subscription
  onsiteOrderList !: onsiteOrder[]
  constructor(private onsiteOrdersService : OnsiteOrdersService) {
    
  }
  
  ngOnInit(): void {
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      // this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
    }
    console.log(this.paginationNavigator.row)
  }

  getPaginatedData(page: number, row: number) {
    this.getOrderSubscriable$ = this.onsiteOrdersService.getData(
      this.setAndGetPaginationJson(page, row)).subscribe(
        (response) => {
          this.onsiteOrderList = response.data.content
          this.paginationNavigator.totalNoOfElements = response.data.totalElements
          this.paginationNavigator.totalNoOfpage = response.data.totalPages
          this.paginationNavigator.noOfElements = response.data.numberOfElements
        }
      )
  }

  setAndGetPaginationJson(page: number, row: number) {
    return this.paginationJson = {
      row: row,
      page: page,
      timeRange: "00:00:00"
    }
  }

  onTableDataChange(event: any) {
    this.paginationNavigator.currentPage = event
    this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
  }

  ngOnDestroy(): void {
    if(this.getOrderSubscriable$){
      this.getOrderSubscriable$.unsubscribe();
    }
  }
}
