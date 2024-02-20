import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  private resizeSubject = new BehaviorSubject<number>(window.innerWidth);
  collapsed: boolean = false;
  constructor() { }

  setCollapsed(collapsed: boolean) {
    this.collapsedSubject.next(collapsed);
  }
  setScreenResize(resize: number) {
    this.resizeSubject.next(resize);
  }

  getCollapsed(): Observable<boolean> {
    return this.collapsedSubject.asObservable();
  }

  getScreenResize(): Observable<number> {
    return this.resizeSubject.asObservable();
  }

}
