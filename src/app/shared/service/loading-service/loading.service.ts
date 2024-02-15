import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(collapsed: boolean) {
    this.loadingSubject.next(collapsed);
  }

  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
