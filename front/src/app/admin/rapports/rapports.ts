import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

import {
  AdminStatistiquesService,
  StatistiquesAdmin
} from '../../core/services/admin-statistiques';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './rapports.html',
  styleUrl: './rapports.css'
})
export class Rapport implements OnInit {

  today = new Date();
  statistiques: StatistiquesAdmin | null = null;

  chargement = true;

  erreur = '';

  periode = 'ce_mois';

  typeRapport = 'global';

  constructor(
    private statistiquesService: AdminStatistiquesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerRapport();
  }

  chargerRapport(): void {

    this.chargement = true;
    this.erreur = '';

    this.statistiquesService
      .getStatistiques(this.periode)
      .subscribe({

        next: (data) => {

          this.statistiques = data;

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur chargement rapport :',
            error
          );

          this.erreur =
            'Impossible de charger les données du rapport.';

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        }

      });

  }

  changerPeriode(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.periode = select.value;

    this.chargerRapport();

  }

  changerTypeRapport(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.typeRapport = select.value;

  }

  afficherType(type: string): boolean {

    return this.typeRapport === 'global' || this.typeRapport === type;

  }

  get titreRapport(): string {

    const titres: Record<string, string> = {
      global: 'Synthèse générale',
      commandes: 'Rapport des commandes',
      utilisateurs: 'Rapport des utilisateurs',
      vendeurs: 'Rapport des vendeurs',
      produits: 'Rapport des produits'
    };

    return titres[this.typeRapport] || titres['global'];

  }

  get evolutionPositive(): boolean {

    return (
      (this.statistiques?.commandes_change_pct ?? 0) >= 0
    );

  }

  get evolutionCommandes(): number {

    return (
      this.statistiques?.commandes_change_pct ?? 0
    );

  }

  imprimerRapport(): void {

    window.print();

  }

  exporterPdf(): void {

    if (!this.statistiques) {
      return;
    }

    const pdf = new jsPDF();
    const statistiques = this.statistiques;
    const lignes = [
      ['Utilisateurs', statistiques.utilisateurs_total],
      ['Nouveaux utilisateurs ce mois', statistiques.nouveaux_utilisateurs_ce_mois],
      ['Vendeurs actifs', statistiques.vendeurs_actifs],
      ['Vendeurs en attente', statistiques.vendeurs_en_attente],
      ['Produits', statistiques.produits_total],
      ['Commandes sur la période', statistiques.commandes_total],
      ['Commandes aujourd’hui', statistiques.commandes_du_jour],
      ['Commandes ce mois', statistiques.commandes_ce_mois],
      ['Commandes mois précédent', statistiques.commandes_mois_precedent]
    ];

    pdf.setFontSize(18);
    pdf.text('Rapport administrateur', 20, 20);
    pdf.setFontSize(12);
    pdf.text(this.titreRapport, 20, 30);
    pdf.text(`Période : ${this.libellePeriode}`, 20, 38);
    pdf.text(`Généré le : ${this.today.toLocaleDateString('fr-FR')}`, 20, 46);

    let positionY = 62;
    for (const [libelle, valeur] of lignes) {
      pdf.text(String(libelle), 20, positionY);
      pdf.text(String(valeur), 150, positionY);
      positionY += 9;
    }

    // Télécharger en utilisant Blob pour éviter les violations de Permissions Policy
    try {
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${this.periode}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      // Fallback vers save()
      pdf.save(`rapport-${this.periode}.pdf`);
    }

  }

  exporterExcel(): void {

    if (!this.statistiques) {
      return;
    }

    const statistiques = this.statistiques;
    const lignes = [
      { Indicateur: 'Utilisateurs', Valeur: statistiques.utilisateurs_total },
      { Indicateur: 'Nouveaux utilisateurs ce mois', Valeur: statistiques.nouveaux_utilisateurs_ce_mois },
      { Indicateur: 'Vendeurs actifs', Valeur: statistiques.vendeurs_actifs },
      { Indicateur: 'Vendeurs en attente', Valeur: statistiques.vendeurs_en_attente },
      { Indicateur: 'Produits', Valeur: statistiques.produits_total },
      { Indicateur: 'Commandes sur la période', Valeur: statistiques.commandes_total },
      { Indicateur: 'Commandes aujourd’hui', Valeur: statistiques.commandes_du_jour },
      { Indicateur: 'Commandes ce mois', Valeur: statistiques.commandes_ce_mois },
      { Indicateur: 'Commandes mois précédent', Valeur: statistiques.commandes_mois_precedent }
    ];

    const feuille = XLSX.utils.json_to_sheet(lignes);
    feuille['!cols'] = [{ wch: 34 }, { wch: 16 }];
    const classeur = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(classeur, feuille, 'Rapport');
    
    // Télécharger en utilisant Blob pour éviter les violations de Permissions Policy
    try {
      const blob = XLSX.write(classeur, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(excelBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${this.periode}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      // Fallback vers writeFile()
      XLSX.writeFile(classeur, `rapport-${this.periode}.xlsx`);
    }

  }

  get libellePeriode(): string {

    const libelles: Record<string, string> = {
      aujourd_hui: "Aujourd'hui",
      ce_mois: 'Ce mois',
      mois_precedent: 'Mois précédent',
      global: 'Depuis le début'
    };

    return libelles[this.periode] || this.periode;

  }

}