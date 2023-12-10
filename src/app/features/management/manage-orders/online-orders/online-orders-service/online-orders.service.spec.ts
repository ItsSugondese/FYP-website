import { TestBed } from '@angular/core/testing';

import { OnlineOrdersService } from './online-orders.service';

describe('OnlineOrdersService', () => {
  let service: OnlineOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
