import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInspectBodyComponent } from './user-inspect-body.component';

describe('UserInspectBodyComponent', () => {
  let component: UserInspectBodyComponent;
  let fixture: ComponentFixture<UserInspectBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInspectBodyComponent]
    });
    fixture = TestBed.createComponent(UserInspectBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
