import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ClientSectionService } from '../../core/services/client-section';
import { Informations } from './components/informations/infos-personnelles';
import { Adresses } from './components/adresses/adresses-profil';
import { Securite } from './components/securite/securite';
import { Notifications } from './components/notifications-profil/notifications-profil';
import { ZoneDanger } from './components/zone-danger/zone-danger';

import { Commandes } from './components/commandes/commandes';
import { Favoris } from './components/favoris/favoris';
import { Avis } from './components/avis/avis';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    Informations,
    Adresses,
    Securite,
    Notifications,
    ZoneDanger,
    Commandes,
    Favoris,
    Avis
  ],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit, OnDestroy {

  sectionActive$!: Observable<string>;
  
  private sectionSub?: Subscription;

  constructor(
    private sectionService: ClientSectionService
  ) {}

  ngOnInit(): void {
    this.sectionActive$ = this.sectionService.section$;
    // Subscribe for any side effects if needed
    this.sectionSub = this.sectionService.section$.subscribe(section => {
      console.log('Profil section changed to:', section);
    });
  }

  ngOnDestroy(): void {
    this.sectionSub?.unsubscribe();
  }

}