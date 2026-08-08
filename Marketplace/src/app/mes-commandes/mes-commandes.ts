import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService, Commande } from '../services/commande.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-mes-commandes',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './mes-commandes.html',
  styleUrls: ['./mes-commandes.scss']
})
export class MesCommandes implements OnInit {

  commandes: Commande[] = [];
  activeSidebarItem = 'commandes' as const;

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getMesCommandes().subscribe({
      next: (data: any) => {
        this.commandes = (Array.isArray(data) ? data : (data?.results ?? [])).map((commande: any) => ({
          ...commande,
          id: commande.id,
          statut: commande.statut || 'en_attente',
          montant_total: commande.montant_total ?? commande.total ?? 0,
          adresse_livraison: commande.adresse_livraison || '',
          notes: commande.notes || '',
          lignes: (commande.lignes ?? []).map((ligne: any) => ({
            ...ligne,
            produit: ligne.produit || {},
            sous_total: ligne.sous_total ?? ((ligne.quantite ?? 0) * (ligne.prix_unitaire ?? 0))
          })),
          paiement: commande.paiement || null,
          date_creation: commande.date_creation || commande.date || null
        }));
      },
      error: (err: unknown) => {
        console.error(err);
        this.commandes = [];
      }
    });
  }

}