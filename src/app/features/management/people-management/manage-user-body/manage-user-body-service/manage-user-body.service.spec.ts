import { TestBed } from '@angular/core/testing';

import { ManageUserBodyService } from './manage-user-body.service';

describe('ManageUserBodyService', () => {
  let service: ManageUserBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
