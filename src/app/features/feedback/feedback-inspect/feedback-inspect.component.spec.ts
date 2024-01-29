import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInspectComponent } from './feedback-inspect.component';

describe('FeedbackInspectComponent', () => {
  let component: FeedbackInspectComponent;
  let fixture: ComponentFixture<FeedbackInspectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackInspectComponent]
    });
    fixture = TestBed.createComponent(FeedbackInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
