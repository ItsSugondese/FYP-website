import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserBodyService {
  private isInspect = new BehaviorSubject<boolean>(true);
  
  constructor() { }

  setInspect(inspect: boolean) {
    this.isInspect.next(inspect);
  }
  

  getInspect(): Observable<boolean> {
    return this.isInspect.asObservable();
  }


}
