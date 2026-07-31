import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionHeader } from './promotion-header';

describe('PromotionHeader', () => {
  let component: PromotionHeader;
  let fixture: ComponentFixture<PromotionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
