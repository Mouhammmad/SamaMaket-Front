import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTable } from './promotion-table';

describe('PromotionTable', () => {
  let component: PromotionTable;
  let fixture: ComponentFixture<PromotionTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
