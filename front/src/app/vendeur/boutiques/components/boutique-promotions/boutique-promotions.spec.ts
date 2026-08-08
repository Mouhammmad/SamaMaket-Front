import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiquePromotions } from './boutique-promotions';

describe('BoutiquePromotions', () => {
  let component: BoutiquePromotions;
  let fixture: ComponentFixture<BoutiquePromotions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiquePromotions],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiquePromotions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
