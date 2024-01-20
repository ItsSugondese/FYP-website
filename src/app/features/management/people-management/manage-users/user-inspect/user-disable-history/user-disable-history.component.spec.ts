import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisableHistoryComponent } from './user-disable-history.component';

describe('UserDisableHistoryComponent', () => {
  let component: UserDisableHistoryComponent;
  let fixture: ComponentFixture<UserDisableHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDisableHistoryComponent]
    });
    fixture = TestBed.createComponent(UserDisableHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
