import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoutiqueTabs } from './components/boutique-tabs/boutique-tabs';
import { BoutiqueHeader } from './components/boutique-header/boutique-header';
import { BoutiqueSidebar } from './components/boutique-sidebar/boutique-sidebar';
import { BoutiqueProducts } from './components/boutique-products/boutique-products';
import { VendeurProduits } from '../../core/services/vendeur-produits';
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
  imports: [CommonModule, ReactiveFormsModule, BoutiqueTabs, BoutiqueSidebar, BoutiqueProducts, BoutiqueHeader],
  templateUrl: './boutiques.html',
  styleUrl: './boutiques.css'
})
export class Boutiques implements OnInit {
  boutiqueForm: FormGroup;
  maBoutique: any = null;
  ongletActif = 'produits';
  produits: any[] = [];
  chargementProduits = true;
  selectedBanniere?: File;
  selectedLogo?: File;
  constructor(
    private fb: FormBuilder,
    private boutiqueService: Boutique,
    private produitService: VendeurProduits
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

    const request = this.maBoutique
      ? this.boutiqueService.modifierBoutique(data)
      : this.boutiqueService.creerBoutique(data);

    request.subscribe({
      next: () => {

        this.chargerBoutique();

          alert('Boutique enregistrée avec succès.');

      },
      error: () => {
        alert('Impossible d’enregistrer la boutique pour le moment.');
      }
    });
  }
  changerOnglet(tab: string){

  this.ongletActif = tab;

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

      this.maBoutique = response;

      this.boutiqueForm.patchValue({
        nom: response.nom || '',
        description: response.description || '',
        ville: response.ville || '',
        telephone: response.telephone || '',
        email: response.email || ''
      });

    },

    error: () => {

      this.maBoutique = null;

    }

  });

}

chargerProduits(): void {
  this.chargementProduits = true;

  this.produitService.getProduits().subscribe({
    next: (response: any) => {
      console.log('Produits API response', response);
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
}