import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class Profil {

  sectionActive = 'profil';

constructor(
  private sectionService: ClientSectionService
) {

  this.sectionService.section$.subscribe(section => {

    this.sectionActive = section;

  });

}

}