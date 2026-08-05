import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSummary } from './confirmation-summary';

describe('ConfirmationSummary', () => {
  let component: ConfirmationSummary;
  let fixture: ComponentFixture<ConfirmationSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
