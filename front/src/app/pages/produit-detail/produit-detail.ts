import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProduitService } from '../../core/services/produit';
import { Produit } from '../../core/models/produit';
import { PanierService } from '../../core/services/panier';
import { PanierItem } from '../../core/models/panier';
import { CarteProduit } from '../../shared/carte-produit/carte-produit';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CarteProduit
  ],
  templateUrl: './produit-detail.html',
  styleUrl: './produit-detail.css'
})
export class ProduitDetail implements OnInit {

  id!: number;

  produit?: Produit;
  produitsSimilaires: Produit[] = [];
  chargement = true;

  erreur = '';

  quantite = 1;

  promotion: any = null;

  favoris = false;

  promoCode = '';

  promoMessage = '';

  avis = '';

  note = 5;

  avisMessage = '';

  estConnecte = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.estConnecte = !!localStorage.getItem('access');

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      if (!id) {

        this.erreur = 'Produit introuvable';

        this.chargement = false;

        return;

      }

      this.id = id;

      this.chargerProduit();

    });

  }

  chargerProduit() {

    this.chargement = true;

    this.produitService.getProduct(this.id).subscribe({

      next: (data) => {

        this.produit = data;

        this.chargement = false;
        
        this.chargerProduitsSimilaires();

        this.chargerPromotion(this.id);
        
        this.cdr.detectChanges();

      },

      error: () => {

        this.erreur = 'Impossible de charger ce produit';

        this.chargement = false;

      }

    });

  }

  augmenterQuantite() {

    if (!this.produit) return;

    if (this.quantite < this.produit.quantite_stock) {

      this.quantite++;

    }

  }

  diminuerQuantite() {

    if (this.quantite > 1) {

      this.quantite--;

    }

  }

  ajouterAuPanier() {

    if (!this.produit) return;

    const item: PanierItem = {

      produitId: this.produit.id,

      nom: this.produit.nom,

      prix: Number(this.produit.prix),

      image:
        this.produit.image_url ||
        this.produit.image ||
        'assets/images/placeholder-product.jpg',

      quantite: this.quantite

    };

    this.panierService.ajouter(item);

    alert('Produit ajouté au panier.');

  }

  acheterMaintenant() {

    this.ajouterAuPanier();

    this.router.navigate(['/checkout']);

  }

  basculerFavori() {

    if (!this.estConnecte || !this.produit) {

      this.avisMessage = 'Veuillez vous connecter.';

      return;

    }

    this.http.post('/api/produits/favoris/ajouter/', {

      produit_id: this.produit.id

    }).subscribe({

      next: () => {

        this.favoris = true;

      }

    });

  }

  envoyerAvis() {

    if (!this.produit) return;

    this.http.post('/api/produits/avis/', {

      produit_id: this.produit.id,

      commentaire: this.avis,

      note: this.note

    }).subscribe({

      next: () => {

        this.avisMessage = 'Merci pour votre avis';

        this.avis = '';

      }

    });

  }

  validerCodePromo() {

    if (!this.promoCode) return;

    this.http.post('/api/produits/promotions/appliquer/', {

      code: this.promoCode

    }).subscribe({

      next: (res: any) => {

        this.promotion = res;

        this.promoMessage = 'Code accepté';

      },

      error: () => {

        this.promoMessage = 'Code invalide';

      }

    });

  }

  chargerPromotion(id: number) {

    this.http.get(`/api/produits/promotions/?produit_id=${id}`)

      .subscribe({

        next: (data: any) => {

          if (Array.isArray(data) && data.length > 0) {

            this.promotion = data[0];

          }

        }

      });

  }
  chargerProduitsSimilaires(): void {

  if (!this.produit) {
    return;
  }

  this.produitService.getProducts().subscribe({

    next: (data) => {

      // Produits de la même catégorie
      let similaires = data.filter(p =>
        p.id !== this.produit!.id &&
        p.categorie === this.produit!.categorie
      );

      // Si moins de 4 produits similaires,
      // on complète avec d'autres produits
      if (similaires.length < 4) {

        const autres = data.filter(p =>
          p.id !== this.produit!.id &&
          !similaires.some(s => s.id === p.id)
        );

        similaires = [
          ...similaires,
          ...autres
        ];

      }

      this.produitsSimilaires = similaires.slice(0, 4);

    },

    error: (err) => {

      console.error(err);

    }

  });

}
}