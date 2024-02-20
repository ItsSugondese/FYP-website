import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesLayoutComponent } from './features-layout.component';

describe('FeaturesLayoutComponent', () => {
  let component: FeaturesLayoutComponent;
  let fixture: ComponentFixture<FeaturesLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesLayoutComponent]
    });
    fixture = TestBed.createComponent(FeaturesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
