import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-paiment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './paiment.html',
  styleUrl: './paiment.scss'
})
export class PaimentComponent implements OnInit {

  selectedMethod = 'wave';
  panier: any[] = [];
  total = 0;
  livraison = 2000;
  message = '';

  address = {
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    phone: ''
  };

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.panierService.getPanier().subscribe({
      next: (data: any) => {
        this.panier = (data.articles ?? []).map((article: any) => ({
          ...article,
          nom: article.produit?.nom || article.nom || 'Produit',
          prix: article.produit?.prix ?? article.prix ?? 0,
          image: article.produit?.image || article.image || article.image_url || 'assets/images/no-image.png'
        }));
        this.total = data.total ?? 0;
      }
    });
  }

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  payer() {
    if (!this.address.address.trim() || !this.address.phone.trim()) {
      this.message = 'Veuillez compléter votre adresse et votre téléphone.';
      return;
    }

    const methode = this.selectedMethod === 'wave' ? 'wave' : this.selectedMethod === 'orange' ? 'orange_money' : 'wave';

    this.panierService.validerCommande(this.address.address, methode).subscribe({
      next: (response: any) => {
        const commandeId = response?.commande?.id;
        if (commandeId) {
          this.router.navigate(['/confirmation'], {
            queryParams: { commande_id: commandeId }
          });
        } else {
          this.router.navigate(['/confirmation']);
        }
      },
      error: (err: any) => {
        this.message = err.error?.erreur || 'Impossible de finaliser la commande.';
      }
    });
  }

}