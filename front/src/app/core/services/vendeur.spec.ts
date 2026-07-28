import { TestBed } from '@angular/core/testing';

import { VendeurProduits } from './vendeur-produits';

describe('VendeurProduits', () => {
  let service: VendeurProduits;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeurProduits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
