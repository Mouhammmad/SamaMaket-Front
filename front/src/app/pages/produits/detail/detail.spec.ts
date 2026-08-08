import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { Detail } from './detail';
import { ProduitService } from '../../../core/services/produit';
import { PanierService } from '../../../core/services/panier';

describe('Detail', () => {
  let component: Detail;
  let fixture: ComponentFixture<Detail>;
  let panierService: jasmine.SpyObj<PanierService>;

  beforeEach(async () => {
    panierService = jasmine.createSpyObj('PanierService', ['ajouterProduit', 'chargerNombreArticles']);
    panierService.ajouterProduit.and.returnValue(of({ message: 'Produit ajouté au panier avec succès.' }));

    await TestBed.configureTestingModule({
      imports: [Detail],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '9' }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ProduitService, useValue: { getProduit: () => of({ id: 9, nom: 'Produit test', prix: 2500 }) } },
        { provide: PanierService, useValue: panierService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Detail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart on event from quick buy', () => {
    component.produit = { id: 9, nom: 'Produit test', prix: 2500 } as any;

    component.ajouterAuPanier({ produit: { id: 9 }, quantite: 2 });

    expect(panierService.ajouterProduit).toHaveBeenCalledWith(9, 2);
    expect(panierService.chargerNombreArticles).toHaveBeenCalled();
  });
});
