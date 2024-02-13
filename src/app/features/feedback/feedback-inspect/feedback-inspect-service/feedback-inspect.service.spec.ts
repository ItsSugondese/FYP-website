import { TestBed } from '@angular/core/testing';

import { FeedbackInspectService } from './feedback-inspect.service';

describe('FeedbackInspectService', () => {
  let service: FeedbackInspectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackInspectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
