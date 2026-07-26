import { TestBed } from '@angular/core/testing';

import { Livraison } from './livraison';

describe('Livraison', () => {
  let service: Livraison;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Livraison);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
