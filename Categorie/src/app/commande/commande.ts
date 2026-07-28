import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data';
import { Observable } from 'rxjs';
import { Commande } from '../data'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-commande',
  standalone:true,
  imports: [],
  templateUrl: './commande.html',
  styleUrl: './commande.scss',
  host:{ 'ngSkipHydration': 'true'} 
})  

export class CommandeComponent implements OnInit {
  // Variable pour stocker les commandes reçues dev l'API
  listCommandes: any[] = [];


  // Injection du service via le constructeur 
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerCommandes();
  }
 
  chargerCommandes(): void {
    this.dataService.getCommandes().subscribe({
      next: (data: any) => {
        console.log('Données reçues de django:', data);
        this.listCommandes = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erreur de récupération des données', err);
      }
    });
  }
}
