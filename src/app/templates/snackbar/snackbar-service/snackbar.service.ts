import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomMessage } from '../snackbar.template.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private messageSource = new Subject<CustomMessage>();
  message$ : Observable<CustomMessage> = this.messageSource.asObservable();
  isVisible: boolean = false;

  showMessage(message: CustomMessage) {
    this.messageSource.next(message);
  }
}
