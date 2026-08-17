import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionCalendar } from './components/promotion-calendar/promotion-calendar';
import { PromotionService } from '../../core/services/promotion';
import { PromotionChart } from './components/promotion-chart/promotion-chart';
import { PromotionHeader } from './components/promotion-header/promotion-header';
import { PromotionFilter } from './components/promotion-filter/promotion-filter';
import { PromotionTable } from './components/promotion-table/promotion-table';
import { PromotionForm } from './components/promotion-form/promotion-form';
import { PromotionPreview } from './components/promotion-preview/promotion-preview';
import { PromotionTimeline } from './components/promotion-timeline/promotion-timeline';
import { PromotionAnalytics } from './components/promotion-analytics/promotion-analytics';
import { PromotionDashboard } from './components/promotion-dashboard/promotion-dashboard';
@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [
    CommonModule,
    PromotionHeader,
    PromotionDashboard,
    PromotionChart,
    PromotionCalendar,
    PromotionAnalytics,
    PromotionTimeline,
    PromotionFilter,
    PromotionTable,
    PromotionForm,
    PromotionPreview,
    
  ],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css'
})
export class Promotions implements OnInit {

  promotions: any[] = [];

  private estPromotionActive(promotion: any): boolean {
    const valeur = promotion?.est_active ?? promotion?.est_actif;

    if (typeof valeur === 'boolean') {
      return valeur;
    }

    if (typeof valeur === 'string') {
      return ['true', '1', 'yes', 'oui', 'active'].includes(valeur.toLowerCase());
    }

    if (typeof valeur === 'number') {
      return valeur === 1;
    }

    return Boolean(valeur);
  }

  promotionsFiltrees: any[] = [];

  promotionSelectionnee: any = null;

  afficherFormulaire = false;

  afficherPreview = false;

  loading = true;
  recherche = '';

statutSelectionne = '';

typeSelectionne = '';

  constructor(
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.chargerPromotions();
  }

  chargerPromotions(): void {
    this.loading = true;
    this.promotionService.getPromotions().subscribe({
      next: (data: any) => {
        const payload = Array.isArray(data) ? data : (data?.results || []);
        // Trier par date de création décroissante (nouvelles en haut)
        const sorted = payload.sort((a: any, b: any) => {
          const dateA = new Date(a.date_creation || a.date_ajout || 0).getTime();
          const dateB = new Date(b.date_creation || b.date_ajout || 0).getTime();
          return dateB - dateA; // Décroissant
        });
        this.promotions = sorted;
        this.promotionsFiltrees = [...sorted];
        this.appliquerFiltres();
        this.loading = false;
      },
      error: (error) => {
        console.error('[Promotions] load error', error);
        this.promotions = [];
        this.promotionsFiltrees = [];
        this.loading = false;
      }
    });
    
  }

  ouvrirFormulaire(): void {

    this.promotionSelectionnee = null;

    this.afficherFormulaire = true;

  }

  modifierPromotion(promotion: any): void {

    this.promotionSelectionnee = promotion;

    this.afficherFormulaire = true;

  }

  fermerFormulaire(): void {

    this.afficherFormulaire = false;
    this.promotionSelectionnee = null;

  }

  supprimerPromotion(promotion: any): void {

    if (!confirm(`Supprimer "${promotion.code}" ?`)) {

      return;

    }

    this.promotionService.supprimerPromotion(
      promotion.id
    ).subscribe({

      next: () => {

        this.chargerPromotions();

      },
      error: (error) => {
        console.error('[Promotions] delete error', error);
        alert('Impossible de supprimer cette promotion.');
      }

    });

  }

  ouvrirPreview(promotion: any): void {

    this.promotionSelectionnee = promotion;

    this.afficherPreview = true;

  }

  fermerPreview(): void {

    this.afficherPreview = false;

  }
filtrerRecherche(texte: string): void {

  this.recherche = texte.toLowerCase();

  this.appliquerFiltres();

}

filtrerStatut(statut: string): void {

  this.statutSelectionne = statut;

  this.appliquerFiltres();

}

filtrerType(type: string): void {

  this.typeSelectionne = type;
  this.appliquerFiltres();

}
appliquerFiltres(): void {

  this.promotionsFiltrees = this.promotions.filter(promotion => {

    const rechercheOK =

      !this.recherche ||

      promotion.code.toLowerCase().includes(this.recherche);

    const statutOK =

      !this.statutSelectionne ||

      (this.statutSelectionne === 'active' && this.estPromotionActive(promotion)) ||

      (this.statutSelectionne === 'inactive' && !this.estPromotionActive(promotion));

    const typeOK =

      !this.typeSelectionne ||

      promotion.type_remise === this.typeSelectionne;

    return rechercheOK && statutOK && typeOK;

  });

}
dupliquerPromotion(promotion:any){

    this.promotionSelectionnee={

        ...promotion,

        id:null,

        code:promotion.code+'-COPIE'

    };

    this.afficherFormulaire=true;

}
}