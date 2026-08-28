import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { VendeurProduits } from '../../../../core/services/vendeur-produits';
import { CategorieService } from '../../../../core/services/categorie';
import { Categorie } from '../../../../core/models/categorie';

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
export class ProduitFrom implements OnChanges {

  @Input() produit: any = null;

  @Output() produitAjoute = new EventEmitter<void>();

  @Output() fermer = new EventEmitter<void>();

  produitForm: FormGroup;

  categories: Categorie[] = [];

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  mainImageIndex = 0;
  messageErreur = '';
  enregistrementEnCours = false;

  constructor(
    private fb: FormBuilder,
    private produitService: VendeurProduits,
    private categorieService: CategorieService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {

    this.produitForm = this.fb.group({

      nom: ['', Validators.required],

      categorie: ['', Validators.required],

      prix: [0, Validators.required],

      stock: [0, Validators.required],

      description: ['', Validators.required],

      est_actif: [true]

    });

    this.loadCategories();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['produit'] && this.produit) {

      this.produitForm.patchValue({

        nom: this.produit.nom,

        categorie: this.produit.categorie || this.findCategoryNameById(this.produit.categorie_id),

        prix: this.produit.prix,

        stock: this.produit.quantite_stock,

        description: this.produit.description,

        est_actif: this.produit.est_actif

      });

    }

  }

    private findCategoryIdByName(nom: string): any {
      if (!nom) return '';
    const found = this.categories.find(c => c.nom === nom);
      return found ? (found as any).id : '';
  }

  private findCategoryNameById(id: number): string {
    return this.categories.find((categorie) => categorie.id === id)?.nom || '';
  }

  loadCategories(): void {

    this.categorieService.getCategories().subscribe({

      next: (categories) => {

        this.categories = categories;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFiles = Array.from(input.files);
    this.imagePreviews = [];
    this.mainImageIndex = 0;

    const loads = this.selectedFiles.map(file => this.readFileAsDataURL(file));
    Promise.all(loads).then((previews) => {
      this.ngZone.run(() => {
        this.imagePreviews = previews;
        this.cdr.detectChanges();
      });
    }).catch((error) => {
      console.error('Erreur lecture images :', error);
    });
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Invalid file data'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  setMainImage(index: number): void {
    if (index === this.mainImageIndex) {
      return;
    }

    const selectedFile = this.selectedFiles[index];
    this.selectedFiles[index] = this.selectedFiles[this.mainImageIndex];
    this.selectedFiles[this.mainImageIndex] = selectedFile;

    const preview = this.imagePreviews[index];
    this.imagePreviews[index] = this.imagePreviews[this.mainImageIndex];
    this.imagePreviews[this.mainImageIndex] = preview;

    this.mainImageIndex = 0;
  }

  supprimerImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);

    if (this.selectedFiles.length === 0) {
      this.mainImageIndex = 0;
      return;
    }

    if (index === this.mainImageIndex) {
      this.mainImageIndex = 0;
      return;
    }

    if (index < this.mainImageIndex) {
      this.mainImageIndex -= 1;
    }
  }

  enregistrer(): void {
    this.messageErreur = '';
    if (this.produitForm.invalid) {
      this.produitForm.markAllAsTouched();
      this.messageErreur = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.enregistrementEnCours) {
      return;
    }

    this.enregistrementEnCours = true;

    this.resoudreCategorie(this.produitForm.value.categorie).subscribe({
      next: (categorieId) => {
        const formData = new FormData();
        formData.append('nom', this.produitForm.value.nom);
        formData.append('categorie_id', String(categorieId));
        formData.append('prix', this.produitForm.value.prix);
        formData.append('quantite_stock', this.produitForm.value.stock);
        formData.append('description', this.produitForm.value.description);
        formData.append('est_actif', this.produitForm.value.est_actif);

        this.selectedFiles.forEach((file) => {
          formData.append('images', file);
        });

        if (this.selectedFiles.length > 0) {
          formData.append('image', this.selectedFiles[this.mainImageIndex]);
        }

        const requete = this.produit
          ? this.produitService.modifierProduit(this.produit.id, formData)
          : this.produitService.ajouterProduit(formData);

        requete.subscribe({
          next: () => this.finaliserEnregistrement(),
          error: (error) => {
            this.enregistrementEnCours = false;
            this.messageErreur = this.extraireMessageErreur(error, 'Impossible d’enregistrer le produit.');
            console.error(error);
          }
        });
      },
      error: (error) => {
        this.enregistrementEnCours = false;
        this.messageErreur = this.extraireMessageErreur(error, 'Impossible de créer la catégorie.');
        console.error('Erreur création catégorie :', error);
      }
    });
  }

  private resoudreCategorie(nom: string): Observable<number> {
    const nomCategorie = String(nom || '').trim();
    const categorieExistante = this.categories.find(
      (categorie) => categorie.nom.toLowerCase() === nomCategorie.toLowerCase()
    );

    if (categorieExistante) {
      return of(categorieExistante.id);
    }

    return this.categorieService.creerCategorie(nomCategorie).pipe(
      map((categorie) => categorie.id)
    );
  }

  private finaliserEnregistrement(): void {

    this.produitForm.reset({

      est_actif: true

    });

    this.selectedFiles = [];
    this.enregistrementEnCours = false;

    this.produitAjoute.emit();

    this.fermer.emit();

  }

  private extraireMessageErreur(error: any, messageParDefaut: string): string {
    const details = error?.error;
    if (typeof details === 'string') {
      return details;
    }
    if (details?.detail) {
      return details.detail;
    }
    if (details && typeof details === 'object') {
      return Object.entries(details)
        .map(([champ, erreur]) => `${champ}: ${Array.isArray(erreur) ? erreur.join(', ') : erreur}`)
        .join(' | ');
    }
    return messageParDefaut;
  }

}