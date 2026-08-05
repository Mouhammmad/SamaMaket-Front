import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAvis } from './produit-avis';

describe('ProduitAvis', () => {
  let component: ProduitAvis;
  let fixture: ComponentFixture<ProduitAvis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitAvis],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitAvis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
