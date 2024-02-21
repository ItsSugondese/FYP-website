import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddStaffService {

  constructor() { }

  private savedSubject = new BehaviorSubject<boolean>(false);

  setIsSaved(collapsed: boolean) {
    this.savedSubject.next(collapsed);
  }

  getIsSaved(): Observable<boolean> {
    return this.savedSubject.asObservable();
  }
}
