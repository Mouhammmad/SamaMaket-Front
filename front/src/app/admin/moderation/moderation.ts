import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type OngletModeration =
  | 'avis'
  | 'produits'
  | 'boutiques'
  | 'utilisateurs';

interface Avis {
  id: number;
  note?: number;
  commentaire?: string;
  texte?: string;
  utilisateur?: any;
  produit?: any;
  date_creation?: string;
  est_approuve?: boolean;
}

interface Produit {
  id: number;
  nom: string;
  prix?: string | number;
  image?: string;
  image_url?: string;
  boutique?: any;
  est_actif?: boolean;
}

interface Boutique {
  id: number;
  nom: string;
  ville?: string;
  apprové?: boolean;
  proprietaire?: string;
  categorie?: string;
  email?: string;
}

interface Utilisateur {
  id: number;
  username?: string;
  nom?: string;
  email?: string;
  role?: string;
  phone?: string;
  is_active?: boolean;
  statut?: string;
  date_joined?: string;
}

@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moderation.html',
  styleUrl: './moderation.css'
})
export class Moderation implements OnInit {

  private http = inject(HttpClient);
  private changeDetectorRef = inject(ChangeDetectorRef);

  private readonly apiUrl = 'http://127.0.0.1:8000/api';

  ongletActif: OngletModeration = 'avis';

  avis: Avis[] = [];
  produits: Produit[] = [];
  boutiques: Boutique[] = [];
  utilisateurs: Utilisateur[] = [];

  chargementAvis = false;
  chargementProduits = false;
  chargementBoutiques = false;
  chargementUtilisateurs = false;

  erreurAvis = '';
  erreurProduits = '';
  erreurBoutiques = '';
  erreurUtilisateurs = '';

  recherche = '';
  filtreStatut = 'tous';

  ngOnInit(): void {
    this.chargerAvis();
    this.chargerProduits();
    this.chargerBoutiques();
    this.chargerUtilisateurs();
  }

  changerOnglet(onglet: OngletModeration): void {
    this.ongletActif = onglet;
    this.reinitialiserFiltres();
  }

  estActif(onglet: OngletModeration): boolean {
    return this.ongletActif === onglet;
  }

  reinitialiserFiltres(): void {
    this.recherche = '';
    this.filtreStatut = 'tous';
  }

  get avisFiltres(): Avis[] {
    const recherche = this.recherche.toLowerCase().trim();
    return this.avis.filter((avis) => {
      const texte = [
        this.getNomUtilisateur(avis.utilisateur),
        this.getNomProduit(avis.produit),
        this.getCommentaireAvis(avis)
      ].join(' ').toLowerCase();
      const correspondRecherche = !recherche || texte.includes(recherche);
      const correspondStatut = this.filtreStatut === 'tous' ||
        (this.filtreStatut === 'approuve' && avis.est_approuve === true) ||
        (this.filtreStatut === 'attente' && avis.est_approuve !== true);
      return correspondRecherche && correspondStatut;
    });
  }

  get produitsFiltres(): Produit[] {
    const recherche = this.recherche.toLowerCase().trim();
    return this.produits.filter((produit) => {
      const texte = [produit.nom, this.getNomBoutique(produit.boutique)]
        .join(' ').toLowerCase();
      const correspondRecherche = !recherche || texte.includes(recherche);
      const correspondStatut = this.filtreStatut === 'tous' ||
        (this.filtreStatut === 'actif' && produit.est_actif !== false) ||
        (this.filtreStatut === 'inactif' && produit.est_actif === false);
      return correspondRecherche && correspondStatut;
    });
  }

  get boutiquesFiltrees(): Boutique[] {
    const recherche = this.recherche.toLowerCase().trim();
    return this.boutiques.filter((boutique) => {
      const texte = [boutique.nom, boutique.proprietaire, boutique.ville]
        .filter(Boolean).join(' ').toLowerCase();
      const correspondRecherche = !recherche || texte.includes(recherche);
      const correspondStatut = this.filtreStatut === 'tous' ||
        (this.filtreStatut === 'approuve' && this.estBoutiqueApprouvee(boutique)) ||
        (this.filtreStatut === 'attente' && !this.estBoutiqueApprouvee(boutique));
      return correspondRecherche && correspondStatut;
    });
  }

  get utilisateursFiltres(): Utilisateur[] {
    const recherche = this.recherche.toLowerCase().trim();
    return this.utilisateurs.filter((utilisateur) => {
      const texte = [utilisateur.nom, utilisateur.username, utilisateur.email]
        .filter(Boolean).join(' ').toLowerCase();
      const correspondRecherche = !recherche || texte.includes(recherche);
      const correspondStatut = this.filtreStatut === 'tous' ||
        (this.filtreStatut === 'actif' && this.estUtilisateurActif(utilisateur)) ||
        (this.filtreStatut === 'suspendu' && !this.estUtilisateurActif(utilisateur));
      return correspondRecherche && correspondStatut;
    });
  }

  /* ============================
     AVIS
  ============================ */

  chargerAvis(): void {
    this.chargementAvis = true;
    this.erreurAvis = '';

    this.http.get<any>(`${this.apiUrl}/produits/avis/?vendeur=true`).subscribe({
      next: (response) => {
        this.avis = this.extraireListe(response);
        this.chargementAvis = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur chargement avis :', error);

        this.erreurAvis =
          'Impossible de récupérer les avis.';

        this.chargementAvis = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  /* ============================
     PRODUITS
  ============================ */

  chargerProduits(): void {
    this.chargementProduits = true;
    this.erreurProduits = '';

    this.http.get<any>(`${this.apiUrl}/produits/`).subscribe({
      next: (response) => {
        this.produits = this.extraireListe(response);
        this.chargementProduits = false;
      },
      error: (error) => {
        console.error('Erreur chargement produits :', error);

        this.erreurProduits =
          'Impossible de récupérer les produits.';

        this.chargementProduits = false;
      }
    });
  }

  /* ============================
     BOUTIQUES
  ============================ */

  chargerBoutiques(): void {
    this.chargementBoutiques = true;
    this.erreurBoutiques = '';

    this.http
      .get<any>(`${this.apiUrl}/dashboard/admin/boutiques/`)
      .subscribe({
        next: (response) => {
          this.boutiques = this.extraireListe(response);
          this.chargementBoutiques = false;
        },
        error: (error) => {
          console.error('Erreur chargement boutiques :', error);

          this.erreurBoutiques =
            'Impossible de récupérer les boutiques.';

          this.chargementBoutiques = false;
        }
      });
  }

  /* ============================
     UTILISATEURS
  ============================ */

  chargerUtilisateurs(): void {
    this.chargementUtilisateurs = true;
    this.erreurUtilisateurs = '';

    this.http
      .get<any>(`${this.apiUrl}/dashboard/admin/utilisateurs/`)
      .subscribe({
        next: (response) => {
          this.utilisateurs = this.extraireListe(response);
          this.chargementUtilisateurs = false;
        },
        error: (error) => {
          console.error('Erreur chargement utilisateurs :', error);

          this.erreurUtilisateurs =
            'Impossible de récupérer les utilisateurs.';

          this.chargementUtilisateurs = false;
        }
      });
  }

  /* ============================
     OUTILS
  ============================ */

  private extraireListe(response: any): any[] {

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.results)) {
      return response.results;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  }

  getNombreAvis(): number {
    return this.avis.length;
  }

  getNombreProduits(): number {
    return this.produits.length;
  }

  getNombreBoutiquesEnAttente(): number {
    return this.boutiques.filter(
      boutique => boutique.apprové === false
    ).length;
  }

  getNombreUtilisateursSuspendus(): number {
    return this.utilisateurs.filter(
      utilisateur =>
        utilisateur.is_active === false ||
        utilisateur.statut?.toLowerCase() === 'suspendu'
    ).length;
  }

  getNomUtilisateur(utilisateur: any): string {
    if (!utilisateur) {
      return 'Utilisateur inconnu';
    }

    if (typeof utilisateur === 'string') {
      return utilisateur;
    }

    return (
      utilisateur.nom ||
      utilisateur.username ||
      utilisateur.email ||
      'Utilisateur inconnu'
    );
  }

  getNomProduit(produit: any): string {
    if (!produit) {
      return 'Produit inconnu';
    }

    if (typeof produit === 'string') {
      return produit;
    }

    return produit.nom || 'Produit inconnu';
  }

  getNomBoutique(boutique: any): string {
    if (!boutique) {
      return 'Boutique inconnue';
    }

    if (typeof boutique === 'string') {
      return boutique;
    }

    return boutique.nom || 'Boutique inconnue';
  }

  getNoteAvis(avis: Avis): number {
    return Number(avis.note ?? 0);
  }

  getCommentaireAvis(avis: Avis): string {
    return (
      avis.commentaire ||
      avis.texte ||
      'Aucun commentaire'
    );
  }

  getRoleLabel(role?: string): string {
    if (!role) {
      return 'Inconnu';
    }

    const roles: Record<string, string> = {
      admin: 'Admin',
      ADMIN: 'Admin',
      client: 'Client',
      CLIENT: 'Client',
      vendeur: 'Vendeur',
      VENDOR: 'Vendeur'
    };

    return roles[role] || role;
  }

  getStatutUtilisateur(utilisateur: Utilisateur): string {
    if (
      utilisateur.is_active === false ||
      utilisateur.statut?.toLowerCase() === 'suspendu'
    ) {
      return 'Suspendu';
    }

    return 'Actif';
  }

  estUtilisateurActif(utilisateur: Utilisateur): boolean {
    return (
      utilisateur.is_active !== false &&
      utilisateur.statut?.toLowerCase() !== 'suspendu'
    );
  }

  estBoutiqueApprouvee(boutique: Boutique): boolean {
    return boutique.apprové === true;
  }

  modererAvis(avis: Avis, approuve: boolean): void {
    this.http.patch(`${this.apiUrl}/produits/avis/${avis.id}/moderation/`, {
      est_approuve: approuve
    }).subscribe({
      next: (response) => {
        Object.assign(avis, response);
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur modération avis :', error);
        this.erreurAvis = 'Impossible de mettre à jour cet avis.';
      }
    });
  }

  supprimerAvis(avis: Avis): void {
    if (!confirm('Supprimer définitivement cet avis ?')) {
      return;
    }

    this.http.delete(`${this.apiUrl}/produits/avis/${avis.id}/supprimer/`).subscribe({
      next: () => {
        this.avis = this.avis.filter((item) => item.id !== avis.id);
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur suppression avis :', error);
        this.erreurAvis = 'Impossible de supprimer cet avis.';
      }
    });
  }

  changerStatutProduit(produit: Produit): void {
    const estActif = produit.est_actif === false;
    this.http.patch(`${this.apiUrl}/produits/admin/produits/${produit.id}/`, {
      est_actif: estActif
    }).subscribe({
      next: () => {
        produit.est_actif = estActif;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur statut produit :', error);
        this.erreurProduits = 'Impossible de modifier le statut du produit.';
      }
    });
  }

  changerStatutBoutique(boutique: Boutique): void {
    const apprové = !this.estBoutiqueApprouvee(boutique);
    this.http.patch(`${this.apiUrl}/dashboard/admin/boutiques/${boutique.id}/`, {
      apprové
    }).subscribe({
      next: () => {
        boutique.apprové = apprové;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur statut boutique :', error);
        this.erreurBoutiques = 'Impossible de modifier le statut de la boutique.';
      }
    });
  }

  changerStatutUtilisateur(utilisateur: Utilisateur): void {
    const action = this.estUtilisateurActif(utilisateur) ? 'suspendre' : 'reactiver';
    this.http.patch(`${this.apiUrl}/dashboard/admin/utilisateurs/${utilisateur.id}/gestion/`, {
      action
    }).subscribe({
      next: () => {
        utilisateur.is_active = action === 'reactiver';
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur statut utilisateur :', error);
        this.erreurUtilisateurs = 'Impossible de modifier le statut de l’utilisateur.';
      }
    });
  }

}