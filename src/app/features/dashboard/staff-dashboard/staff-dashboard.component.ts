import { Component, OnInit } from '@angular/core';
import { Customer, Representative } from './customer';
import { Table } from '../../management/table-management-body/table-management/table-management-service/model/table.model';
import { CustomerService } from './customerservice';
import { ManageUsersService } from '../../management/people-management/manage-user-body/manage-users/manage-users-service/manage-users.service';
import { Subscription } from 'rxjs';
import { UserFinanceData, UserFinancePaginationPayload } from '../dashboard-service/model/user-finance-data.model';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { PaginatorState } from 'primeng/paginator';
import { CommonVariable } from '@shared/helper/inherit/common-variable';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent extends CommonVariable implements OnInit {
  customers!: Customer[];

  representatives!: Representative[];
  users!: PaginatedData<UserFinanceData>;

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  userDataSubscription$ !: Subscription
  financeDataPayload : UserFinancePaginationPayload = {
    row : 1,
    page: 1,
    fromDate: "2024-01-01",
    toDate : "2024-04-01",
  }
  constructor(private customerService: CustomerService, private userService: ManageUsersService) {
    super()
  }

  onTableDataChange(event: any) {
    this.financeDataPayload.page = event
    this.fetchData();
  }
 
  onSelectedDropdown(event: any) {
    if (this.financeDataPayload.row != event) {
      this.financeDataPayload.row = event
      this.financeDataPayload.page = 1
      this.fetchData();
    }
  }

fetchData(){
this.userDataSubscription$ = this.userService.getFinanceData(this.financeDataPayload).subscribe(
  (res) => {
    this.users = res.data
  }
)
}
  ngOnInit() {
    this.fetchData()
      this.customerService.getCustomersLarge().then((customers) => {
          this.customers = customers;
          this.loading = false;

          this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
      });

      this.representatives = [
          { name: 'Amy Elsner', image: 'amyelsner.png' },
          { name: 'Anna Fali', image: 'annafali.png' },
          { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
          { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
          { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
          { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
          { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
          { name: 'Onyama Limba', image: 'onyamalimba.png' },
          { name: 'Stephen Shaw', image: 'stephenshaw.png' },
          { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      ];

      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
      ];
  }



  getSeverity(status: string) : string {
      switch (status.toLowerCase()) {
          case 'unqualified':
              return 'danger';

          case 'qualified':
              return 'success';

          case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

              default: 
              return 'success'
      }
  }
}