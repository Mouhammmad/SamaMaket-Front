import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProduitService } from './produit';
import { Produit } from '../models/produit';

describe('ProduitService', () => {
  let service: ProduitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProduitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request products through the local API proxy', () => {
    const mockProducts: Produit[] = [
      {
        id: 1,
        nom: 'Produit test',
        prix: 1200,
        quantite_stock: 10,
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('/api/produits/');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
