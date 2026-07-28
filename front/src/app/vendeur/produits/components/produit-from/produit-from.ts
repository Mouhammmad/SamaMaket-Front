import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendeurProduits } from '../../../../core/services/vendeur-produits';
import { CategorieService } from '../../../../core/services/categorie';
import { Categorie } from '../../../../core/models/categorie';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-produit-from',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './produit-from.html',
  styleUrl: './produit-from.css'
})
export class ProduitFrom {
  @Output() produitAjoute = new EventEmitter<void>();

  produitForm: FormGroup;
  categories: Categorie[] = [];
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: VendeurProduits,
    private categorieService: CategorieService
  ) {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      categorie: ['', Validators.required],
      prix: [0, Validators.required],
      stock: [0, Validators.required],
      description: ['', Validators.required],
      est_actif: [true],
      images: [null]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    console.log('ProduitFrom.loadCategories()');
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        console.log('ProduitFrom categories loaded', categories);
        this.categories = categories;
      },
      error: (error) => {
        console.error('Impossible de charger les catégories', error);
      }
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    this.selectedFiles = Array.from(input.files);
  }

  enregistrer(): void {
    if (this.produitForm.invalid) {
      this.produitForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.produitForm.value.nom);
    formData.append('categorie_id', this.produitForm.value.categorie);
    formData.append('prix', this.produitForm.value.prix);
    formData.append('quantite_stock', this.produitForm.value.stock);
    formData.append('description', this.produitForm.value.description);
    formData.append('est_actif', this.produitForm.value.est_actif);
    
    if (this.selectedFiles.length > 0) {
      formData.append('image', this.selectedFiles[0]);
    }

    this.produitService.ajouterProduit(formData).subscribe({
      next: (response: any) => {
        console.log('Produit enregistré :', response);
        this.produitForm.reset({ est_actif: true });
        this.selectedFiles = [];
        this.produitAjoute.emit();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}