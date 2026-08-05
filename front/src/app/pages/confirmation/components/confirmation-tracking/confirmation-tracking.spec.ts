import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationTracking } from './confirmation-tracking';

describe('ConfirmationTracking', () => {
  let component: ConfirmationTracking;
  let fixture: ComponentFixture<ConfirmationTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationTracking],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
