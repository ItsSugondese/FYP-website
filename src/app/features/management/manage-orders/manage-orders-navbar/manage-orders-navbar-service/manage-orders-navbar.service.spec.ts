import { TestBed } from '@angular/core/testing';

import { ManageOrdersNavbarService } from './manage-orders-navbar.service';

describe('ManageOrdersNavbarService', () => {
  let service: ManageOrdersNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageOrdersNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
