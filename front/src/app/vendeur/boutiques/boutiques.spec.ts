import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Boutique, Boutiques } from './boutiques';
import { PromotionService } from '../../core/services/promotion';
import { VendeurProduits } from '../../core/services/vendeur-produits';

describe('Boutiques', () => {
  let component: Boutiques;
  let fixture: ComponentFixture<Boutiques>;
  let boutiqueService: Boutique;
  let httpMock: HttpTestingController;
  let promotionService: jasmine.SpyObj<PromotionService>;
  let produitService: jasmine.SpyObj<VendeurProduits>;

  beforeEach(async () => {
    promotionService = jasmine.createSpyObj('PromotionService', ['getPromotions']);
    promotionService.getPromotions.and.returnValue(of([{ id: 1, code: 'PROMO1', est_active: true }]));

    produitService = jasmine.createSpyObj('VendeurProduits', ['getProduits']);
    produitService.getProduits.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [Boutiques, HttpClientTestingModule],
      providers: [
        { provide: PromotionService, useValue: promotionService },
        { provide: VendeurProduits, useValue: produitService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Boutiques);
    component = fixture.componentInstance;
    boutiqueService = TestBed.inject(Boutique);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the proxy-friendly boutique endpoint', () => {
    boutiqueService.getMaBoutique().subscribe();

    const req = httpMock.expectOne('/api/boutiques/ma/');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, nom: 'Ma boutique' });
  });

  it('should load promotions from the service', () => {
    expect(promotionService.getPromotions).toHaveBeenCalled();
    expect(component.promotions.length).toBe(1);
    expect(component.promotions[0].code).toBe('PROMO1');
  });
});
