import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PromotionService } from '../../../../core/services/promotion';
import { VendeurProduits } from '../../../../core/services/vendeur-produits';

@Component({
  selector: 'app-promotion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './promotion-form.html',
  styleUrl: './promotion-form.css'
})
export class PromotionForm implements OnInit {

  @Input() promotion: any = null;

  @Output() enregistrer = new EventEmitter<void>();

  @Output() fermer = new EventEmitter<void>();

  form!: FormGroup;

  produits: any[] = [];
  produitsFiltres: any[] = [];

  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private produitService: VendeurProduits
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      code: ['', Validators.required],

      type_remise: ['pourcentage', Validators.required],

      taux_remise: [0, Validators.required],

      date_debut: ['', Validators.required],

      date_fin: ['', Validators.required],

      est_active: [true],

      produits_ids: [[]]

    });

    if (this.promotion) {

      this.form.patchValue({

        code: this.promotion.code,
        type_remise: this.promotion.type_remise,
        taux_remise: this.promotion.taux_remise,
        date_debut: this.promotion.date_debut,
        date_fin: this.promotion.date_fin,
        est_active: this.promotion.est_active,
        produits_ids: this.promotion.produits?.map((p: any) => p.id) || []

      });

    }

    this.chargerProduits();

  }

  chargerProduits(): void {

  this.produitService.getProduits().subscribe({

    next: (data: any) => {

      const payload = Array.isArray(data)
        ? data
        : data?.results || [];

      this.produits = payload;
      this.produitsFiltres = [...payload];

    },

    error: (err) => {

      console.error(err);

      this.produits = [];
      this.produitsFiltres = [];

    }

  });

}

  enregistrerPromotion() {

    this.form.updateValueAndValidity();

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const payload = {
      code: (this.form.value.code || '').trim(),
      type_remise: this.form.value.type_remise,
      taux_remise: Number(this.form.value.taux_remise),
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      est_active: !!this.form.value.est_active,
      produits_ids: Array.isArray(this.form.value.produits_ids)
        ? this.form.value.produits_ids.filter((id: any) => id != null)
        : []
    };

    const requete = this.promotion?.id

      ? this.promotionService.modifierPromotion(
          this.promotion.id,
          payload
        )

      : this.promotionService.ajouterPromotion(payload);

    requete.subscribe({

      next: () => {

        this.enregistrer.emit();

        this.fermer.emit();

      },
      error: (error) => {
        console.error('[PromotionForm] save error', error);
        const detail = error?.error?.detail || error?.error?.message || '';
        const message = detail || 'La promotion n’a pas pu être enregistrée.';
        alert(message);
      }

    });

  }
toggleProduit(event: Event, id: number): void {

  const input = event.target as HTMLInputElement;

  let ids = [...this.form.value.produits_ids];

  if (input.checked) {

    ids.push(id);

  } else {

    ids = ids.filter((x: number) => x !== id);

  }

  this.form.patchValue({

    produits_ids: ids

  });

}

rechercherProduit(event: Event): void {

  const texte = (
    event.target as HTMLInputElement
  ).value.toLowerCase();

  this.produitsFiltres = this.produits.filter(

    produit =>

      produit.nom
      .toLowerCase()
      .includes(texte)

  );

}
estSelectionne(id: number): boolean {

  return this.form.value.produits_ids.includes(id);

}
toutSelectionner(): void {

  this.form.patchValue({

    produits_ids: this.produits.map(

      p => p.id

    )

  });

}
toutDeselectionner(): void {

  this.form.patchValue({

    produits_ids: []

  });

}
calculerPrixPromo(produit: any): number {

  const valeur = this.form.get('taux_remise')?.value || 0;

  const type = this.form.get('type_remise')?.value;

  const prix = Number(produit.prix);

  if (type === 'pourcentage') {

    return prix - (prix * valeur / 100);

  }

  return Math.max(

    prix - valeur,

    0

  );

}
}