import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitFrom } from './produit-from';

describe('ProduitFrom', () => {
  let component: ProduitFrom;
  let fixture: ComponentFixture<ProduitFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitFrom],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitFrom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
