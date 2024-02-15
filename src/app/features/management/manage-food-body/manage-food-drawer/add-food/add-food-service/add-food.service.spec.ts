import { TestBed } from '@angular/core/testing';

import { AddFoodService } from './add-food.service';

describe('AddFoodService', () => {
  let service: AddFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
