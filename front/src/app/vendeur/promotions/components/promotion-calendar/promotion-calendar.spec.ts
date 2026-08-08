import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCalendar } from './promotion-calendar';

describe('PromotionCalendar', () => {
  let component: PromotionCalendar;
  let fixture: ComponentFixture<PromotionCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
