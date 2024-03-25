import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { ManageUsersService } from '../manage-user-body/manage-users/manage-users-service/manage-users.service';
import { manageUserPagination } from '../manage-user-body/manage-users/manage-users-service/model/maange-users-payload.model';
import { User } from '../manage-user-body/manage-users/manage-users-service/model/user.model';
import { ManageStaffService } from '../manage-staff-body/manage-staff/manage-staff-service/manage-staff.service';
import { OnsiteOrdersService } from '../../manage-orders/onsite-orders/onsite-orders-service/onsite-orders.service';
import { UserManagementPaymentService } from './user-management-payment-service/user-management-payment.service';

@Component({
  selector: 'app-user-management-payment',
  templateUrl: './user-management-payment.component.html',
  styleUrls: ['./user-management-payment.component.scss']
})
export class UserManagementPaymentComponent extends CommonVariable implements OnInit, OnDestroy {

  payCashPopUp : boolean = false
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
      row: this.selectedRow,
      payStatus : this.userPaymentManagementService.selectedOption == 'ALL'? undefined : this.userPaymentManagementService.selectedOption
    }

    this.getPaginatedData();
  }

  selectedUserTypeToFilter(event: string | null) {
    this.manageUserService.selectedOption = event!



    this.getPaginatedData()
  }


  selectedFromUserFilter(event: string ){
    this.userPaymentManagementService.selectedOption = event
    if(event == 'ALL'){
      this.paginationJson.payStatus  = undefined
    }else{
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

