import { TestBed } from '@angular/core/testing';

import { Vendeur } from './vendeur';

describe('Vendeur', () => {
  let service: Vendeur;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vendeur);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
