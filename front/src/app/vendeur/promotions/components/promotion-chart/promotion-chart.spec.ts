import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionChart } from './promotion-chart';

describe('PromotionChart', () => {
  let component: PromotionChart;
  let fixture: ComponentFixture<PromotionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
