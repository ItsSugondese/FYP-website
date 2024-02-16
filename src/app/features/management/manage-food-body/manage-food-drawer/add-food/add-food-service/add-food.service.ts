import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFoodService {
  private savedSubject = new BehaviorSubject<boolean>(false);

  constructor() { }


  setIsSaved(collapsed: boolean) {
    this.savedSubject.next(collapsed);
  }

  getIsSaved(): Observable<boolean> {
    return this.savedSubject.asObservable();
  }
}
