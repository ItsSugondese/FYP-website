import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFoodDrawerComponent } from './manage-food-drawer.component';

describe('ManageFoodDrawerComponent', () => {
  let component: ManageFoodDrawerComponent;
  let fixture: ComponentFixture<ManageFoodDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFoodDrawerComponent]
    });
    fixture = TestBed.createComponent(ManageFoodDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
