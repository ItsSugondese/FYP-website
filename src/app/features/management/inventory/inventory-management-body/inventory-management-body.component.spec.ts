import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementBodyComponent } from './inventory-management-body.component';

describe('InventoryManagementBodyComponent', () => {
  let component: InventoryManagementBodyComponent;
  let fixture: ComponentFixture<InventoryManagementBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryManagementBodyComponent]
    });
    fixture = TestBed.createComponent(InventoryManagementBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
