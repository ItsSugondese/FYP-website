import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFoodBodyComponent } from './manage-food-body.component';

describe('ManageFoodBodyComponent', () => {
  let component: ManageFoodBodyComponent;
  let fixture: ComponentFixture<ManageFoodBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFoodBodyComponent]
    });
    fixture = TestBed.createComponent(ManageFoodBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
