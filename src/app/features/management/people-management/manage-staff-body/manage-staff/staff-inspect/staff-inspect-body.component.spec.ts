import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInspectBodyComponent } from './staff-inspect-body.component';

describe('StaffInspectBodyComponent', () => {
  let component: StaffInspectBodyComponent;
  let fixture: ComponentFixture<StaffInspectBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInspectBodyComponent]
    });
    fixture = TestBed.createComponent(StaffInspectBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
