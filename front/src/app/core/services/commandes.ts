import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  getMesCommandes(): Observable<Commande[]> {

    return of([

      {

        id: 1,

        numero: 'SM-2026-000001',

        date: '25 juillet 2026',

        statut: 'PREPARATION',

        total: 45250,

        produits: [

          {

            produitId: 2,

            nom: 'SAVON SANTEX',

            image: 'http://127.0.0.1:8000/media/produits/téléchargement.jpg',

            prix: 1250,

            quantite: 2

          },

          {

            produitId: 1,

            nom: 'Smartphone Demo',

            image: 'http://127.0.0.1:8000/media/produits/demo.jpg',

            prix: 29999,

            quantite: 1

          }

        ]

      }

    ]);

  }

}