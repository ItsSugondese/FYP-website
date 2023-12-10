import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { defaultPaginationNavigator } from 'src/app/shared/model/pagination/pagination.model';

@Component({
  selector: 'app-onsite-orders',
  templateUrl: './onsite-orders.component.html',
  styleUrls: ['./onsite-orders.component.scss']
})
export class OnsiteOrdersComponent {

  paginationNavigator: defaultPaginationNavigator = {
    currentPage: 1,
    row: 1,
  }

  getOrderSubscriable$ !: Subscription

  constructor() {
    
  }

  onEnterPress(event: any) {
    if ((event.target.value).trim() !== '') {
      this.paginationNavigator.row = event.target.value
      // this.getPaginatedData(this.paginationNavigator.currentPage, this.paginationNavigator.row);
    }
    console.log(this.paginationNavigator.row)
  }

  // getPaginatedData(page: number, row: number) {
  //   this.getOrderSubscriable$ = this.onlineOrdersService.getData(
  //     this.setAndGetPaginationJson(page, row)).subscribe(
  //       (response) => {
  //         this.onlineOrderList = response.data.content
  //         this.paginationNavigator.totalNoOfElements = response.data.totalElements
  //         this.paginationNavigator.totalNoOfpage = response.data.totalPages
  //         this.paginationNavigator.noOfElements = response.data.numberOfElements
  //       }
  //     )
  // }
}
