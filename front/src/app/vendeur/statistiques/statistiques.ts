import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ StatistiquesCards } from './components/statistiques-cards/statistiques-cards';
import{ StatistiquesHeader } from './components/statistiques-header/statistiques-header';
import{ StatistiquesVentes } from './components/statistiques-ventes/statistiques-ventes';
import{ StatistiquesChart } from './components/statistiques-chart/statistiques-chart';
import { StatistiquesService } from '../../core/services/statistiques.service';


@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, StatistiquesCards, StatistiquesHeader, StatistiquesVentes, StatistiquesChart],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css'
})
export class Statistiques implements OnInit {

  statistiques: any = null;

  ventes: any[] = [];

  periode = 'mois';

  chargement = true;

  constructor(
    private statistiquesService: StatistiquesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;

    this.statistiquesService.dashboard(this.periode).subscribe({
      next: (data: any) => {
        this.statistiques = {
          chiffre_affaires: data?.revenue ?? 0,
          commandes: data?.orders ?? 0,
          produits: data?.products ?? 0,
          clients: data?.clients ?? 0,
          note_moyenne: data?.rating ?? 0,
          panier_moyen: data?.average_cart ?? 0,
          favoris: data?.favorites ?? 0,
          conversion: data?.conversion_rate ?? 0,
          periode: this.periode
        };
        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.statistiques = null;
        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      }
    });

    this.statistiquesService.graphiqueRevenus(this.periode).subscribe({
      next: (data: any) => {
        this.ventes = Array.isArray(data)
          ? data.map((item: any) => ({
              label: item.label,
              montant: item.revenue ?? item.montant ?? 0,
              commandes: item.commandes ?? 0
            }))
          : [];
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.ventes = [];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  changerPeriode(periode: string): void {
    this.periode = periode;
    this.charger();
  }

}