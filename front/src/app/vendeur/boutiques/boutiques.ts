import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VendeurProduits } from '../../core/services/vendeur-produits';
import { PromotionService } from '../../core/services/promotion';
import { BoutiqueHeader } from './components/boutique-header/boutique-header';
import { BoutiqueNavigation } from './components/boutique-navigation/boutique-navigation';
import { BoutiqueInfos } from './components/boutique-infos/boutique-infos';
import { BoutiqueNote } from './components/boutique-note/boutique-note';
import { BoutiqueCategories } from './components/boutique-categories/boutique-categories';
import { BoutiqueProduits } from './components/boutique-produits/boutique-produits';
import { BoutiqueApropos } from './components/boutique-apropos/boutique-apropos';
import { BoutiqueAvis } from './components/boutique-avis/boutique-avis';
import { BoutiquePromotions } from './components/boutique-promotions/boutique-promotions';
@Injectable({
  providedIn: 'root'
})
export class Boutique {

  private api = '/api/boutiques/';

  constructor(private http: HttpClient) {}

  getMaBoutique(): Observable<any> {
    return this.http.get(this.api + 'ma/');
  }

  creerBoutique(data: FormData): Observable<any> {
    return this.http.post(this.api + 'create/', data);
  }

  modifierBoutique(data: FormData): Observable<any> {
    return this.http.put(this.api + 'ma/', data);
  }

}

@Component({
  selector: 'app-boutiques',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BoutiqueHeader,
    BoutiqueNavigation,
    BoutiqueInfos,
    BoutiqueNote,
    BoutiqueCategories,
    BoutiqueProduits,
    BoutiqueApropos,
    BoutiqueAvis,
    BoutiquePromotions
  ],
  templateUrl: './boutiques.html',
  styleUrl: './boutiques.css'
})
export class Boutiques implements OnInit {
  boutiqueForm: FormGroup;
  boutique: any = null;
  onglet = 'produits';
  produits: any[] = [];
  promotions: any[] = [];
  avis: any[] = [];
  chargementProduits = true;
  chargementPromotions = true;
  selectedBanniere?: File;
  selectedLogo?: File;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private boutiqueService: Boutique,
    private produitService: VendeurProduits,
    private promotionService: PromotionService
  ) {
    this.boutiqueForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      ville: [''],
      telephone: [''],
      email: ['', Validators.email]
    });
  }

  ngOnInit(): void {
    this.chargerBoutique();
    this.chargerProduits();
    this.chargerPromotions();
  }
  enregistrer(): void {
    if (this.boutiqueForm.invalid) {
      this.boutiqueForm.markAllAsTouched();
      return;
    
    }
    

    const data = new FormData();
    const values = this.boutiqueForm.value;

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, String(value));
      }
    });
    if (this.selectedLogo) {
      data.append('logo', this.selectedLogo);
    }

    if (this.selectedBanniere) {
      data.append('banniere', this.selectedBanniere);
    }

    const request = this.boutique
      ? this.boutiqueService.modifierBoutique(data)
      : this.boutiqueService.creerBoutique(data);

    request.subscribe({
      next: () => {
        this.chargerBoutique();
        this.chargerProduits();
        this.chargerPromotions();
        alert('Boutique enregistrée avec succès.');
      },
      error: () => {
        alert('Impossible d’enregistrer la boutique pour le moment.');
      }
    });
  }
  changerOnglet(tab: string){
    this.onglet = tab;
  }
onBanniereSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (input.files?.length) {

    this.selectedBanniere = input.files[0];

  }

}
onLogoSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (input.files?.length) {

    this.selectedLogo = input.files[0];

  }

}
chargerBoutique(): void {

  this.boutiqueService.getMaBoutique().subscribe({

    next: (response) => {

      console.log(response);

      this.boutique = response;
      this.chargerAvis();

      this.boutiqueForm.patchValue({
        nom: response.nom || '',
        description: response.description || '',
        ville: response.ville || '',
        telephone: response.telephone || '',
        email: response.email || ''
      });

    },

    error: () => {

      this.boutique = null;
      this.avis = [];

    }

  });

}

chargerAvis(): void {
  if (!this.boutique?.id) {
    this.avis = [];
    return;
  }

  this.http.get<any[]>(`/api/boutiques/${this.boutique.id}/avis/`).subscribe({
    next: (response) => {
      this.avis = Array.isArray(response) ? response : [];
    },
    error: () => {
      this.avis = [];
    }
  });
}

chargerProduits(): void {
  this.chargementProduits = true;

  this.produitService.getProduits().subscribe({
    next: (response: any) => {
      const payload = Array.isArray(response)
        ? response
        : response?.results || response?.data || [];

      this.produits = Array.isArray(payload) ? payload : [];
      window.setTimeout(() => {
        this.chargementProduits = false;
      });
    },
    error: (error) => {
      console.error('Produits API error', error);
      this.produits = [];
      window.setTimeout(() => {
        this.chargementProduits = false;
      });
    }
  });
}

chargerPromotions(): void {
  this.chargementPromotions = true;

  this.promotionService.getPromotions().subscribe({
    next: (response: any) => {
      const payload = Array.isArray(response)
        ? response
        : response?.results || response?.data || [];

      this.promotions = Array.isArray(payload) ? payload : [];
      window.setTimeout(() => {
        this.chargementPromotions = false;
      });
    },
    error: (error) => {
      console.error('Promotions API error', error);
      this.promotions = [];
      window.setTimeout(() => {
        this.chargementPromotions = false;
      });
    }
  });
}
}