import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDrawerComponent } from './table-drawer.component';

describe('TableDrawerComponent', () => {
  let component: TableDrawerComponent;
  let fixture: ComponentFixture<TableDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDrawerComponent]
    });
    fixture = TestBed.createComponent(TableDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
