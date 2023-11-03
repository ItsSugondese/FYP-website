import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteOrdersComponent } from './onsite-orders.component';

describe('OnsiteOrdersComponent', () => {
  let component: OnsiteOrdersComponent;
  let fixture: ComponentFixture<OnsiteOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnsiteOrdersComponent]
    });
    fixture = TestBed.createComponent(OnsiteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
