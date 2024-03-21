import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementPaymentComponent } from './user-management-payment.component';

describe('UserManagementPaymentComponent', () => {
  let component: UserManagementPaymentComponent;
  let fixture: ComponentFixture<UserManagementPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementPaymentComponent]
    });
    fixture = TestBed.createComponent(UserManagementPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
