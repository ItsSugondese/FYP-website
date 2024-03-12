import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableManagementBodyComponent } from './table-management-body.component';

describe('TableManagementBodyComponent', () => {
  let component: TableManagementBodyComponent;
  let fixture: ComponentFixture<TableManagementBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableManagementBodyComponent]
    });
    fixture = TestBed.createComponent(TableManagementBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
