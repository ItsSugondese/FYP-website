import { TestBed } from '@angular/core/testing';

import { MakeOrdersService } from './make-orders.service';

describe('MakeOrdersService', () => {
  let service: MakeOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
