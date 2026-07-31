import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PromotionService } from '../../core/services/promotion';
import { Promotions } from './promotions';

describe('Promotions', () => {
  let component: Promotions;
  let fixture: ComponentFixture<Promotions>;
  let promotionService: jasmine.SpyObj<PromotionService>;

  beforeEach(async () => {
    promotionService = jasmine.createSpyObj('PromotionService', ['getPromotions']);
    promotionService.getPromotions.and.returnValue(of([{ id: 1, code: 'PROMO1' }]));

    await TestBed.configureTestingModule({
      imports: [Promotions],
      providers: [{ provide: PromotionService, useValue: promotionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Promotions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should load promotions from the service', () => {
    expect(promotionService.getPromotions).toHaveBeenCalled();
    expect(component.promotions.length).toBe(1);
    expect(component.promotions[0].code).toBe('PROMO1');
  });
});
