import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { OffresVides } from '../offres-vides/offres-vides';
import {
  Promotion
} from '../../../../core/services/produit';

@Component({
  selector: 'app-offres-flash',
  standalone: true,

  imports: [
    CommonModule,
    OffresVides
  ],

  templateUrl: './offres-flash.html',
  styleUrl: './offres-flash.css'
})
export class OffresFlash {

  @Input() offres: Promotion[] = [];

  @Output() produitClick = new EventEmitter<number>();

  voirOffre(offre: Promotion): void {

    const produit = offre.produits?.[0];

    if (produit) {
      this.produitClick.emit(produit.id);
    }

  }

  calculerPrixPromo(
    prix: string,
    offre: Promotion
  ): number {

    const prixInitial = Number(prix);

    if (
      offre.type_remise === 'pourcentage'
    ) {

      return prixInitial -
        (
          prixInitial *
          Number(offre.taux_remise) /
          100
        );

    }

    return Math.max(
      0,
      prixInitial -
      Number(offre.taux_remise)
    );

  }


  obtenirPourcentage(
    offre: Promotion
  ): number {

    if (
      offre.type_remise === 'pourcentage'
    ) {

      return Number(
        offre.taux_remise
      );

    }

    return 0;

  }


  joursRestants(
    dateFin: string
  ): number {

    const aujourdHui =
      new Date();

    const fin =
      new Date(dateFin);

    const difference =
      fin.getTime() -
      aujourdHui.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      )
    );

  }

}