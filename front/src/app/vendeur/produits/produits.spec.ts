import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurProduits } from '../../core/services/vendeur-produits';
import { Produits } from './produits';

describe('Produits', () => {
  let component: Produits;
  let fixture: ComponentFixture<Produits>;
  let produitService: VendeurProduits;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produits, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Produits);
    component = fixture.componentInstance;
    produitService = TestBed.inject(VendeurProduits);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unpack paginated product responses into an array', () => {
    component.chargerProduits();

    const req = httpMock.expectOne('/api/produits/vendeur/produits/');
    expect(req.request.method).toBe('GET');
    req.flush({ count: 1, next: null, previous: null, results: [{ id: 1, nom: 'Produit test' }] });

    expect(component.produits).toEqual([{ id: 1, nom: 'Produit test' }]);
    expect(component.loading).toBeFalse();
  });
});
