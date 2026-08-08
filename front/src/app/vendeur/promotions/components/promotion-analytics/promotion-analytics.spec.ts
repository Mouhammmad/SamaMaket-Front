import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAnalytics } from './promotion-analytics';

describe('PromotionAnalytics', () => {
  let component: PromotionAnalytics;
  let fixture: ComponentFixture<PromotionAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionAnalytics],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
