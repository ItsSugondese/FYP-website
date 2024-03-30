import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementAdminComponent } from './inventory-management-admin.component';

describe('InventoryManagementAdminComponent', () => {
  let component: InventoryManagementAdminComponent;
  let fixture: ComponentFixture<InventoryManagementAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryManagementAdminComponent]
    });
    fixture = TestBed.createComponent(InventoryManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
