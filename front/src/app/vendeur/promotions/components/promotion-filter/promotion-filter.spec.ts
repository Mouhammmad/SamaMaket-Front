import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFilter } from './promotion-filter';

describe('PromotionFilter', () => {
  let component: PromotionFilter;
  let fixture: ComponentFixture<PromotionFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
