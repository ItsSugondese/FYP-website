import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineOrdersComponent } from './online-orders.component';

describe('OnlineOrdersComponent', () => {
  let component: OnlineOrdersComponent;
  let fixture: ComponentFixture<OnlineOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineOrdersComponent]
    });
    fixture = TestBed.createComponent(OnlineOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
