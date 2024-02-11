import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementBodyComponent } from './order-management-body.component';

describe('OrderManagementBodyComponent', () => {
  let component: OrderManagementBodyComponent;
  let fixture: ComponentFixture<OrderManagementBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderManagementBodyComponent]
    });
    fixture = TestBed.createComponent(OrderManagementBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
