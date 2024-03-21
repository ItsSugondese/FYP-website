import { TestBed } from '@angular/core/testing';

import { UserManagementPaymentService } from './user-management-payment.service';

describe('UserManagementPaymentService', () => {
  let service: UserManagementPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
