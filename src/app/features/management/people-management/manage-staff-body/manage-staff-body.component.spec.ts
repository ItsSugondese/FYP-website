import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffBodyComponent } from './manage-staff-body.component';

describe('ManageStaffBodyComponent', () => {
  let component: ManageStaffBodyComponent;
  let fixture: ComponentFixture<ManageStaffBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStaffBodyComponent]
    });
    fixture = TestBed.createComponent(ManageStaffBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
