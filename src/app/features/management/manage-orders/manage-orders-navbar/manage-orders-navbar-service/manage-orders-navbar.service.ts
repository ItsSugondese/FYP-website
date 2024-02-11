import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ManagementRouteConstant } from 'src/app/constant/routing/management-routing-constant.model';

@Injectable({
  providedIn: 'root'
})
export class ManageOrdersNavbarService {

  routes = ManagementRouteConstant;
  private onsiteOrderSubject = new BehaviorSubject<boolean>(true);
  constructor() { }

  setIsOnsiteOrder(isIt: boolean) {
    this.onsiteOrderSubject.next(isIt);
  }

  getIsOnsiteOrder(): Observable<boolean> {
    return this.onsiteOrderSubject.asObservable();
  }
}
