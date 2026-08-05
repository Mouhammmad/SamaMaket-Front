import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ProduitHeader } from './components/produit-header/produit-header';
import { ProduitFilter } from './components/produit-filter/produit-filter';
import { ProduitTable } from './components/produit-table/produit-table';
import { ProduitFrom } from './components/produit-from/produit-from';

import { VendeurProduits } from '../../core/services/vendeur-produits';
import { CategorieService } from '../../core/services/categorie';
import { PreviewService } from '../../core/services/preview.service';
import { Categorie } from '../../core/models/categorie';
@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    CommonModule,
    ProduitHeader,
    ProduitFilter,
    ProduitTable,
    ProduitFrom
  ],
  templateUrl: './produits.html',
  styleUrls: ['./produits.css']
})
export class Produits implements OnInit {

  loading = true;

  produits: any[] = [];
  produitsFiltres: any[] = [];

  categories: any[] = [];

  recherche = '';

  categorieSelectionnee = '';

  statutSelectionne = '';

  produitSelectionne: any = null;

 afficherFormulaire = false;
previewProduit: any = null;
  

  constructor(
    private produitService: VendeurProduits,
    private categorieService: CategorieService,
    private cdr: ChangeDetectorRef
    , private previewService: PreviewService
  ) {}

  ngOnInit(): void {

    this.chargerProduits();

    this.chargerCategories();

    this.previewService.modify$.subscribe((produit) => {
      this.modifierProduit(produit);
    });

  }

  chargerCategories(): void {

    this.categorieService.getCategories().subscribe({

      next: (data) => {

        this.categories = data;

      }

    });

  }

  chargerProduits(): void {

    this.loading = true;

    this.produitService.getProduits()

      .pipe(

        finalize(() => {

          this.loading = false;

        })

      )

      .subscribe({

        next: (data: any) => {

          console.log('[Produits] getProduits response', data);

          const payload = Array.isArray(data)

            ? data

            : data.results || [];

          console.log('[Produits] parsed payload', payload);

          this.produits = payload;

          this.produitsFiltres = [...payload];

          this.cdr.detectChanges();

          console.log('[Produits] produits', this.produits, 'produitsFiltres', this.produitsFiltres);

        },

        error: (error) => {

          console.error('[Produits] getProduits error', error);

          this.produits = [];

          this.produitsFiltres = [];

        }

      });

  }

  ouvrirFormulaire(): void {

  this.produitSelectionne = null;

  this.afficherFormulaire = true;

}

fermerFormulaire(): void {

  this.afficherFormulaire = false;

}

modifierProduit(produit: any): void {

    this.produitSelectionne = produit;

    this.afficherFormulaire = true;

  }

  changerStatut(produit: any): void {
    produit.est_actif = !produit.est_actif;
    this.produitsFiltres = [...this.produitsFiltres];
  }

  supprimerProduit(produit: any): void {

    if (!confirm(`Supprimer "${produit.nom}" ?`)) {
      return;
    }

    this.produitService.supprimerProduit(produit.id).subscribe({
      next: () => {
        this.chargerProduits();
      },
      error: () => {
        alert('Impossible de supprimer ce produit.');
      }
    });

  }

  filtrerRecherche(texte: string): void {

    this.recherche = texte.toLowerCase();

    this.appliquerFiltres();

  }

  filtrerCategorie(categorie: string): void {

    this.categorieSelectionnee = categorie;

    this.appliquerFiltres();

  }

  filtrerStatut(statut: string): void {

    this.statutSelectionne = statut;

    this.appliquerFiltres();

  }

  appliquerFiltres(): void {


    const selectedCatId = this.categorieSelectionnee ? String(this.categorieSelectionnee) : '';
    const selectedCat = selectedCatId ? this.categories.find(c => String((c as any).id) === selectedCatId) : null;

    this.produitsFiltres = this.produits.filter(produit => {

      const rechercheOK =
        !this.recherche ||
        produit.nom.toLowerCase().includes(this.recherche);

      // compare by id when available, else compare by category name
      const categorieOK =
        !selectedCatId ||
        (produit.categorie_id !== undefined && String(produit.categorie_id) === selectedCatId) ||
        (selectedCat && produit.categorie && produit.categorie === selectedCat.nom) ||
        (produit.categorie && String(produit.categorie) === selectedCatId);

      const statutOK =
        !this.statutSelectionne ||
        (this.statutSelectionne === 'actif' && produit.est_actif) ||
        (this.statutSelectionne === 'inactif' && !produit.est_actif);

      return rechercheOK && categorieOK && statutOK;

    });

  }

  augmenterStock(produit: any): void {

    produit.quantite_stock++;

  }

  diminuerStock(produit: any): void {

    if (produit.quantite_stock > 0) {

      produit.quantite_stock--;

    }

  }

  ouvrirPreview(produit: any): void {
    this.previewService.open(produit);
  }

  fermerPreview(): void {

    this.previewService.close();

  }

  dupliquerProduit(produit: any): void {
    console.log('[Produits] dupliquerProduit', produit);

    const formData = new FormData();
    formData.append('nom', produit.nom + ' (copie)');
    formData.append('description', produit.description || '');
    const catId = produit.categorie_id ? produit.categorie_id : (this.categories.find(c => c.nom === produit.categorie) as any)?.id;
    if (catId) formData.append('categorie_id', String(catId));
    formData.append('prix', String(produit.prix));
    formData.append('quantite_stock', String(produit.quantite_stock || 0));
    formData.append('est_actif', produit.est_actif ? 'true' : 'false');

    this.produitService.ajouterProduit(formData).subscribe({
      next: () => this.chargerProduits(),
      error: (err) => { console.error('Duplication failed', err); alert('Impossible de dupliquer ce produit.'); }
    });

  }

}
