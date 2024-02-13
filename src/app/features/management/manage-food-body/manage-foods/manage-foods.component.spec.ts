import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFoodsComponent } from './manage-foods.component';

describe('ManageFoodsComponent', () => {
  let component: ManageFoodsComponent;
  let fixture: ComponentFixture<ManageFoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFoodsComponent]
    });
    fixture = TestBed.createComponent(ManageFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
