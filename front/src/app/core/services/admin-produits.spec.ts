import { TestBed } from '@angular/core/testing';

import { AdminProduits } from './admin-produits';

describe('AdminProduits', () => {
  let service: AdminProduits;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProduits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
