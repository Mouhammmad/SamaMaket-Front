import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProducts } from './boutique-products';

describe('BoutiqueProducts', () => {
  let component: BoutiqueProducts;
  let fixture: ComponentFixture<BoutiqueProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
