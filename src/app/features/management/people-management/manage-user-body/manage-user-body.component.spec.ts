import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserBodyComponent } from './manage-user-body.component';

describe('ManageUserBodyComponent', () => {
  let component: ManageUserBodyComponent;
  let fixture: ComponentFixture<ManageUserBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserBodyComponent]
    });
    fixture = TestBed.createComponent(ManageUserBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
