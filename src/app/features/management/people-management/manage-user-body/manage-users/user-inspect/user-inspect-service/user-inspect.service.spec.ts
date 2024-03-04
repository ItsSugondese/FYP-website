import { TestBed } from '@angular/core/testing';

import { UserInspectService } from './user-inspect.service';

describe('UserInspectService', () => {
  let service: UserInspectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInspectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
