import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeService } from '../../core/services/commande.service';
import { PanierService } from '../../core/services/panier.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  panier: any = null;
  adresse = '';
  ville = '';
  telephone = '';
  methodePaiement = 'wave';
  numeroPaiement = '';
  erreur = '';

  constructor(private commandeService: CommandeService, private panierService: PanierService, private router: Router) {}

  ngOnInit() {
    this.panierService.getPanier().subscribe({ next: (data: any) => this.panier = data });
  }

  valider() {
    if (!this.adresse || !this.telephone) {
      this.erreur = 'Veuillez remplir tous les champs';
      return;
    }
    this.commandeService.validerPanier(`${this.adresse}, ${this.ville}`, this.methodePaiement).subscribe({
      next: (data: any) => this.router.navigate(['/confirmation'], { state: { commande: data.commande } }),
      error: () => this.erreur = 'Erreur lors de la commande'
    });
  }
}