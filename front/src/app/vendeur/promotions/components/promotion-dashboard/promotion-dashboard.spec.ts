import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDashboard } from './promotion-dashboard';

describe('PromotionDashboard', () => {
  let component: PromotionDashboard;
  let fixture: ComponentFixture<PromotionDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
