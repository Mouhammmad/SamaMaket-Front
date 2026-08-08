import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitVariantes } from './produit-variantes';

describe('ProduitVariantes', () => {
  let component: ProduitVariantes;
  let fixture: ComponentFixture<ProduitVariantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitVariantes],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitVariantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
