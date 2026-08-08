import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategorieService } from '../../../core/services/categorie';
import { ProduitService } from '../../../core/services/produit';
import { PanierService } from '../../../core/services/panier';
import { FavoriService } from '../../../core/services/favori.service';
import { Produit } from '../../../core/models/produit';

import { CatalogueHeader } from './components/catalogue-header/catalogue-header';
import { CatalogueFilter } from './components/catalogue-filter/catalogue-filter';
import { Pagination } from './components/pagination/pagination';
import { CatalogueEmpty } from './components/catalogue-empty/catalogue-empty';
import { ProduitCard } from './components/produit-card/produit-card';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    CatalogueHeader,
    CatalogueFilter,
    ProduitCard,
    Pagination,
    CatalogueEmpty
  ],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue implements OnInit {

  produits: Produit[] = [];

  categories: any[] = [];

  totalProduits = 0;

  page = 1;

  pages = 1;

  tri = 'pertinence';

  filtresActifs: { key: string; label: string }[] = [];

  messagePanier = '';

  filtres = {

    categorie: null,

    prixMin: 0,

    prixMax: 150000,

    note: null,

    vendeurVerifie: false

  };

  constructor(

    private produitService: ProduitService,

    private router: Router,
    private categorieService: CategorieService,
    private panierService: PanierService,
    private favoriService: FavoriService

  ){}

  ngOnInit(): void {

    this.chargerProduits();
     this.chargerCategories();

  }
  chargerCategories(): void {

    this.categorieService.getCategories()

    .subscribe({

        next: (categories) => {

            this.categories = categories;

        }

    });

}

  chargerProduits(): void {

    const params: any = {
      page: this.page
    };

    // n'envoyer que les filtres actifs pour éviter les conversions/validations côté serveur
    if (this.filtres.prixMin && this.filtres.prixMin > 0) {
      params.prix_min = this.filtres.prixMin;
    }

    if (this.filtres.prixMax && this.filtres.prixMax < 150000) {
      params.prix_max = this.filtres.prixMax;
    }

    if (this.filtres.note) {
      params.note = this.filtres.note;
    }

    if (this.filtres.categorie) {
      params.categorie = this.filtres.categorie;
    }

    if (this.filtres.vendeurVerifie) {
      params.vendeurVerifie = true;
    }

    if (this.tri && this.tri !== 'pertinence') {
      params.ordering = this.tri;
    }

    this.produitService.getProduits(params).subscribe({

    next:(response)=>{
        console.log('[Catalogue] produits response', response);
        this.produits = response.results || [];
        this.totalProduits = response.count || 0;
        this.pages = response.total_pages || 1;
    },
    error:(err)=>{
        console.error('[Catalogue] produits error', err);
        this.produits = [];
        this.totalProduits = 0;
        this.pages = 1;
    }

});
    
  }
  rechercher(texte: string){

    if(!texte){

        this.chargerProduits();

        return;

    }

    this.produitService.rechercher(texte)

    .subscribe({

        next:(response)=>{

            this.produits=response.results;

            this.totalProduits=response.count;

            this.pages=response.total_pages;

        }

    });

}

  changerPage(page:number){

    this.page = page;

    this.chargerProduits();

  }

  changerTri(tri:string){

    this.tri = tri;

    this.page = 1;

    this.chargerProduits();

  }

  appliquerFiltres(filtres:any){

    this.filtres = filtres;

    this.page = 1;

    this.construireFiltresActifs();

    this.chargerProduits();

  }

  reinitialiserFiltres(){

    this.filtres = {

      categorie:null,

      prixMin:0,

      prixMax:150000,

      note:null,

      vendeurVerifie:false

    };

    this.page = 1;

    this.construireFiltresActifs();

    this.chargerProduits();

  }

  supprimerFiltre(cle:string){

    switch (cle) {

      case 'categorie':
        this.filtres.categorie = null;
        break;

      case 'prixMin':
        this.filtres.prixMin = 0;
        break;

      case 'prixMax':
        this.filtres.prixMax = 150000;
        break;

      case 'note':
        this.filtres.note = null;
        break;

      case 'vendeurVerifie':
        this.filtres.vendeurVerifie = false;
        break;

    }

    this.page = 1;

    this.construireFiltresActifs();

    this.chargerProduits();

  }

  private construireFiltresActifs(): void {

    const actifs: { key: string; label: string }[] = [];

    if (this.filtres.categorie) {
      const categorie = this.categories.find(
        (c) => c.id === this.filtres.categorie
      );
      actifs.push({
        key: 'categorie',
        label: `Catégorie : ${categorie?.nom ?? 'Sélectionnée'}`
      });
    }

    if (this.filtres.prixMin > 0) {
      actifs.push({
        key: 'prixMin',
        label: `Prix min : ${this.filtres.prixMin}`
      });
    }

    if (this.filtres.prixMax < 150000) {
      actifs.push({
        key: 'prixMax',
        label: `Prix max : ${this.filtres.prixMax}`
      });
    }

    if (this.filtres.note) {
      actifs.push({
        key: 'note',
        label: `Note ≥ ${this.filtres.note}`
      });
    }

    if (this.filtres.vendeurVerifie) {
      actifs.push({
        key: 'vendeurVerifie',
        label: 'Vendeurs vérifiés'
      });
    }

    this.filtresActifs = actifs;

  }

  voirProduit(id:number){

    this.router.navigate([

        '/produit',

        id

    ]);

  }

  ajouterAuPanier(id:number){

    this.messagePanier = '';

    this.panierService

    .ajouterProduit(id)

    .subscribe({

        next:(response:any)=>{
            this.messagePanier = response?.message || 'Produit ajouté au panier avec succès.';
        },
        error:(err:any)=>{
            console.error('Erreur ajout panier', err);
            const erreur = err?.error;
            if (typeof erreur === 'string') {
              this.messagePanier = erreur;
            } else if (erreur?.detail) {
              this.messagePanier = erreur.detail;
            } else if (erreur?.erreur) {
              this.messagePanier = erreur.erreur;
            } else {
              this.messagePanier = 'Impossible d’ajouter le produit au panier.';
            }
        }

    });

  }

  toggleFavori(id:number){

    this.favoriService

    .toggle(id)

    .subscribe({

        next:()=>{

            this.chargerProduits();

        }

    });

  }

}