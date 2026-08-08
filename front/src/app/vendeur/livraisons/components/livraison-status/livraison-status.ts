import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livraison-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './livraison-status.html',
  styleUrl: './livraison-status.css'
})
export class LivraisonStatus implements OnChanges {

  @Input() livraison: any;

  @Output()
  enregistrer = new EventEmitter<any>();

  statut = '';

  numeroSuivi = '';

  datePrevue = '';

  ngOnChanges(changes: SimpleChanges): void {

    if (this.livraison) {

      this.statut = this.livraison.statut;

      this.numeroSuivi = this.livraison.numero_suivi;

      this.datePrevue = this.livraison.date_prevue;

    }

  }

  sauvegarder(): void {

    this.enregistrer.emit({

      id: this.livraison.id,

      statut: this.statut,

      numero_suivi: this.numeroSuivi,

      date_prevue: this.datePrevue

    });

  }

}