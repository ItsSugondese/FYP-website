import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentHistoryComponent } from './user-payment-history.component';

describe('UserPaymentHistoryComponent', () => {
  let component: UserPaymentHistoryComponent;
  let fixture: ComponentFixture<UserPaymentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentHistoryComponent]
    });
    fixture = TestBed.createComponent(UserPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
