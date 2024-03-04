import { TestBed } from '@angular/core/testing';

import { UserPaymentHistoryService } from './user-payment-history.service';

describe('UserPaymentHistoryService', () => {
  let service: UserPaymentHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPaymentHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
