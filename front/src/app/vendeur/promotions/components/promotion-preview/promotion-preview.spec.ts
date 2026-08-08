import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionPreview } from './promotion-preview';

describe('PromotionPreview', () => {
  let component: PromotionPreview;
  let fixture: ComponentFixture<PromotionPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
