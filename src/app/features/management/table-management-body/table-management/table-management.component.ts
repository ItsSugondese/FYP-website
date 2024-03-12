import { Component, OnInit } from '@angular/core';
import { Table } from './table-management-service/model/table.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { Observable, Subscription } from 'rxjs';
import { TableService } from './table-management-service/table.service';
import { CommonVariable } from '@shared/helper/inherit/common-variable';

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent extends CommonVariable implements OnInit {

  visible : boolean = false;
  qrVisible : boolean = false;
  tablesSubscription$ !: Observable<ResponseData<Table[]>>
  tableQrSubscription$ !: Subscription
  selectedTable !: Table
  imageData !: string | null

  constructor(public tableService: TableService){
    super()
  }

  ngOnInit(): void {
      this.tablesSubscription$ = this.tableService.getAllTables();
  }

  selectingTable(item: Table){
    this.selectedTable = item; 
    this.qrVisible = true

    this.tableQrSubscription$ = this.tableService.getQr(item.id).subscribe((imageBlob: Blob) => {


      this.createImageFromBlob(imageBlob, item.id)
       .then((imageData) => {
        this.imageData = imageData;
        
    })
    .catch((error) => {
        console.log("error when trying to access")
    });
    });
  }


}
