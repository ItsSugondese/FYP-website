import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDisableHistoryComponent } from './staff-disable-history.component';

describe('StaffDisableHistoryComponent', () => {
  let component: StaffDisableHistoryComponent;
  let fixture: ComponentFixture<StaffDisableHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffDisableHistoryComponent]
    });
    fixture = TestBed.createComponent(StaffDisableHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
