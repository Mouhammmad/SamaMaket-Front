import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTimeline } from './promotion-timeline';

describe('PromotionTimeline', () => {
  let component: PromotionTimeline;
  let fixture: ComponentFixture<PromotionTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
