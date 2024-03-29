import { TestBed } from '@angular/core/testing';

import { KhaltiCheckoutService } from './khalti-checkout.service';

describe('KhaltiCheckoutService', () => {
  let service: KhaltiCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhaltiCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
