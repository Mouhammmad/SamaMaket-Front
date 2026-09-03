import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendeurAttenteCard } from '../components/vendeur-attente-card/vendeur-attente-card';
import { StatCard } from '../shared/stat-card/stat-card';
import { UtilisateurRow } from '../shared/utilisateur-row/utilisateur-row';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatCard,
    VendeurAttenteCard,
    UtilisateurRow
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  statistiques: any[] = [];
  vendeursEnAttente: any[] = [];
  utilisateursRecents: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerStatistiques();
    this.chargerVendeursEnAttente();
    this.chargerUtilisateursRecents();
  }

  chargerStatistiques(): void {
    this.adminService.getStats().subscribe({
      next: stats => {
        this.statistiques = [
          {
            titre: 'Utilisateurs total',
            valeur: stats.utilisateurs_total,
            evolution: `${stats.nouveaux_utilisateurs_ce_mois} nouveaux ce mois`,
            couleur: '#3b82f6'
          },
          {
            titre: 'Vendeurs actifs',
            valeur: stats.vendeurs_actifs,
            evolution: `${stats.vendeurs_en_attente} en attente`,
            couleur: '#9333ea'
          },
          {
            titre: 'Produits publiés',
            valeur: stats.produits_total,
            evolution: `${stats.commandes_ce_mois} commandes ce mois`,
            couleur: '#f97316'
          },
          {
            titre: 'Commandes du jour',
            valeur: stats.commandes_du_jour,
            evolution: stats.commandes_change_pct !== null
              ? `${stats.commandes_change_pct}% vs mois précédent`
              : 'Pas de comparaison',
            couleur: '#22c55e'
          }
        ];
        this.cdr.detectChanges();
      }
    });
  }

  chargerVendeursEnAttente(): void {
    this.adminService.getVendeursEnAttente().subscribe({
      next: data => {
        this.vendeursEnAttente = data;
        this.cdr.detectChanges();
      }
    });
  }

  chargerUtilisateursRecents(): void {
    this.adminService.getUtilisateursRecents().subscribe({
      next: data => {
        this.utilisateursRecents = data;
        this.cdr.detectChanges();
      }
    });
  }

  approuver(id: number): void {
    this.adminService.validerBoutique(id, true).subscribe({
      next: () => {
        this.vendeursEnAttente = this.vendeursEnAttente.filter(v => v.id !== id);
        this.cdr.detectChanges();
      }
    });
  }

  refuser(id: number): void {
    this.adminService.validerBoutique(id, false).subscribe({
      next: () => {
        this.vendeursEnAttente = this.vendeursEnAttente.filter(v => v.id !== id);
        this.cdr.detectChanges();
      }
    });
  }
}
