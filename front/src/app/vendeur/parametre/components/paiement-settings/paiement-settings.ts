import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ParametresBoutique } from '../../../../core/services/parametre-boutique';

@Component({
  selector: 'app-paiement-settings',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './paiement-settings.html',
  styleUrl: './paiement-settings.css'
})
export class PaiementSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  waveActif = true;

  orangeMoneyActif = true;

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['parametres'] &&
      this.parametres
    ) {

      this.waveActif =
        this.parametres.wave_actif ?? true;

      this.orangeMoneyActif =
        this.parametres.orange_money_actif ?? true;
    }
  }

  changerWave(): void {
    this.waveActif = !this.waveActif;
  }

  changerOrangeMoney(): void {
    this.orangeMoneyActif = !this.orangeMoneyActif;
  }

  enregistrer(): void {

    this.modifier.emit({
      wave_actif: this.waveActif,
      orange_money_actif: this.orangeMoneyActif
    });
  }
}