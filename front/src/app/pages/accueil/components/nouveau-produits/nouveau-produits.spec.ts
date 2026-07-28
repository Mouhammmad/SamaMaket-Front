import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauProduits } from './nouveau-produits';

describe('NouveauProduits', () => {
  let component: NouveauProduits;
  let fixture: ComponentFixture<NouveauProduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauProduits],
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauProduits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
