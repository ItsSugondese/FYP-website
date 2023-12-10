import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersNavbarComponent } from './manage-orders-navbar.component';

describe('ManageOrdersNavbarComponent', () => {
  let component: ManageOrdersNavbarComponent;
  let fixture: ComponentFixture<ManageOrdersNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOrdersNavbarComponent]
    });
    fixture = TestBed.createComponent(ManageOrdersNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
