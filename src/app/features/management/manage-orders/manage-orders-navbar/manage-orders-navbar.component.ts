import { Component, EventEmitter, Output } from '@angular/core';
import { ManageOrdersNavbarService } from './manage-orders-navbar-service/manage-orders-navbar.service';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';

@Component({
  selector: 'app-manage-orders-navbar',
  templateUrl: './manage-orders-navbar.component.html',
  styleUrls: ['./manage-orders-navbar.component.scss']
})
export class ManageOrdersNavbarComponent {

  @Output() onToggleOrderSection: EventEmitter<boolean> = new EventEmitter();

  routes = ManagementRouteConstant
  
  constructor(public manageOrderNavbarService: ManageOrdersNavbarService) {}

  isClicked(isOnsite : boolean){
    // this.manageOrderNavbarService.setIsOnsiteOrder(isOnsite)
    this.onToggleOrderSection.emit(isOnsite)
    this.manageOrderNavbarService.isOnsite = isOnsite;
  }
 
  
}
