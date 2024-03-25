import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageStaffService } from 'src/app/features/management/people-management/manage-staff-body/manage-staff/manage-staff-service/manage-staff.service';
import { ManageUsersService } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/manage-users.service';
import { manageUserPagination } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/maange-users-payload.model';
import { User } from 'src/app/features/management/people-management/manage-user-body/manage-users/manage-users-service/model/user.model';
import { UserManagementPaymentService } from 'src/app/features/management/people-management/user-management-payment/user-management-payment-service/user-management-payment.service';


@Component({
    selector: 'user-payment-management-table-template',
    template: `
 <div class="" style="width: 100%;">
    <p-table 
    [value]="userListPaginated.content"
    #dt1
    [rows]="paginationJson.row"
    [loading]="load"
 *ngIf="userListPaginated">
    <ng-template pTemplate="caption">
        <div class="flex items-center justify-between">
            
                <div *ngIf="showFilter">
                    <food-filter-template [selectedKey]="userPaymentManagementService.selectedOption" [options]="userPaymentManagementService.options" (optionSelected)="selectedFromUserFilter($event!)"></food-filter-template>
                  </div>
            
                  <div>

<span class="p-input-icon-left ">
  <div>
    <search-template (typedData)="typedUserToFilter($event)"></search-template>
  </div>

</span>
<p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" 
*ngIf="showFilter">
    <ng-template pTemplate="header">
        <div class="px-3 pt-3 pb-0">
            <span class="font-bold">Agent Picker</span>
        </div>
    </ng-template>
    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
    </ng-template>
</p-columnFilter>
</div>
        </div>
    </ng-template>
    <ng-template pTemplate="header">
        <tr>
            <th style="">
                <div class="flex align-items-center">
                    
                </div>
            </th>
            <th style="">
                <div class="flex align-items-center">
                    Name
                </div>
            </th>
            <th style="">
                <div class="flex align-items-center">
                    Email
                    
                </div>
            </th>
            <th style="">
                <div class="flex align-items-center">
                    Total Due
                    
                </div>
            </th>
            <th style="">
                <div class="flex align-items-center">
                    Action
                    
                </div>
            </th>


          
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-user>
        <tr>
            <td>
                <div class="image-container">
                    <div class="w-16 h-16 rounded-full overflow-hidden">
                        <img [src]="imageDataMap[user.id] == null? 'assets/avatar/anon.jpg' : imageDataMap[user.id]" [alt]="'assets/avatar/anon.jpg'"
                            class="w-full h-full object-cover" />
                    </div>
                </div>
            </td>
            <td>
              
                <span class="ml-1 vertical-align-middle">{{ user.fullName }}</span>
            </td>
            <td>
              
                <span class="ml-1 vertical-align-middle">{{ user.email }}</span>
            </td>
            <td>
                
                {{user.remainingAmount}}
            </td>
            <td>
               <div >

                   <default-button-template (clicked)="payCashPopUp = true; selectedUser = user" text="Pay" [isDisabled]="user.remainingAmount == 0" > </default-button-template>
                </div>
            </td>
            
        </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
        <tr>
            <td colspan="7">No Users found.</td>
        </tr>
    </ng-template>
</p-table>
</div>
<tfoot class="flex justify-between   h-full mt-2"  *ngIf="userListPaginated">
    <ng-container *ngFor="let data of userListPaginated.content | paginate: {
        itemsPerPage : paginationJson.row,
        currentPage : userListPaginated.currentPageIndex,
        totalItems : userListPaginated.totalElements
    }; let first= first;">
    </ng-container>
    <p>{{userListPaginated.numberOfElements}} of {{userListPaginated.totalElements}}
        items</p>

    <pagination-controls previousLabel="Prev" nextLabel="Next"
        (pageChange)="onTableDataChange($event)" class="">
    </pagination-controls>

    <pay-cash-template [visible]="payCashPopUp" [max]="selectedUser.remainingAmount" [min]="1" [userId]="selectedUser.id" (visibleChange)="payCashPopUp = false"
      (postStatus)="this.payCashPopUp = false; this.getPaginatedData();" *ngIf="selectedUser"></pay-cash-template>



</tfoot>
  `,
    styles: [
    ],
})
export class UserPaymentManagementTableComponent extends CommonVariable implements OnInit, OnDestroy {

    @Input() row: number = 5
    @Input() showFilter: boolean = true
    payCashPopUp: boolean = false
    selectedUser !: User | null
    userListPaginated !: PaginatedData<User>

    getFoodPicture$ !: Subscription
    imageDataMap: { [key: number]: string } = {};

    paginationJson !: manageUserPagination
    fromTime = new Date();
    getUsersSubscriable$ !: Subscription

    load: boolean = true;


    constructor(public manageUserService: ManageUsersService,
        private staffService: ManageStaffService,
        public userPaymentManagementService: UserManagementPaymentService) {
        super()
    }

    ngOnInit(): void {

        this.paginationJson = {
            userType: ['USER', 'EXTERNAL_USER'],
            page: 1,
            row: this.row,
            payStatus: this.userPaymentManagementService.selectedOption == 'ALL' ? undefined : this.userPaymentManagementService.selectedOption
        }

        this.getPaginatedData();
    }

    selectedUserTypeToFilter(event: string | null) {
        this.manageUserService.selectedOption = event!



        this.getPaginatedData()
    }


    selectedFromUserFilter(event: string) {
        this.userPaymentManagementService.selectedOption = event
        if (event == 'ALL') {
            this.paginationJson.payStatus = undefined
        } else {
            this.paginationJson.payStatus = event
        }

        this.paginationJson.page = 1;
        this.getPaginatedData()
    }

    getPaginatedData() {
        this.load = true
        if (this.manageUserService.selectedOption == 'ALL') {
            this.paginationJson.userType = ['USER', 'EXTERNAL_USER']
        } else if (this.manageUserService.selectedOption == 'INTERNAL') {
            this.paginationJson.userType = ['USER']
        } else {
            this.paginationJson.userType = ['EXTERNAL_USER']
        }

        this.getUsersSubscriable$ = this.manageUserService.getData(
            this.paginationJson).subscribe(
                (response) => {
                    this.userListPaginated = response.data
                    this.getUsersSubscriable$.unsubscribe()
                    this.load = false;

                    this.userListPaginated.content.forEach((menu) => {
                        if (menu.profilePath) {
                            if (!menu.isExternal) {
                                this.imageDataMap[menu.id] = menu.profilePath;
                            } else {


                                this.getFoodPicture$ = this.staffService.getStaffPicture(menu.id).subscribe((imageBlob: Blob) => {


                                    this.createImageFromBlob(imageBlob, menu.id)
                                        .then((imageData) => {
                                            this.imageDataMap[menu.id] = imageData;

                                        })
                                        .catch((error) => {
                                            console.log("error when trying to access")
                                        });
                                }
                                );
                            }
                        }
                    });


                }
            )
    }


    typedUserToFilter(event: string) {
        if (event.trim() != '') {
            this.paginationJson.name = event
        } else {
            this.paginationJson.name = undefined
        }
        this.getPaginatedData()
    }

    onTableDataChange(event: any) {
        this.paginationJson.page = event
        this.getPaginatedData();

    }

    onSelectedDropdown(event: any) {
        if (this.paginationJson.row != event) {
            this.paginationJson.row = event
            this.paginationJson.page = 1
            this.getPaginatedData();
        }
    }


    ngOnDestroy(): void {
        if (this.getUsersSubscriable$) {
            this.getUsersSubscriable$.unsubscribe();
        }
    }

}

