import { TestBed } from '@angular/core/testing';

import { OnsiteOrdersService } from './onsite-orders.service';

describe('OnsiteOrdersService', () => {
  let service: OnsiteOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnsiteOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
