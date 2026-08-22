import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adresses-profil.html',
  styleUrl: './adresses-profil.css'
})
export class Adresses implements OnInit {

  private adressesSubject = new BehaviorSubject<any[]>([
    {
      id: 1,
      titre: 'Domicile',
      adresse: 'Parcelles Assainies, Dakar',
      ville: 'Dakar',
      pays: 'Sénégal',
      principale: true
    },
    {
      id: 2,
      titre: 'Bureau',
      adresse: 'Plateau, Dakar',
      ville: 'Dakar',
      pays: 'Sénégal',
      principale: false
    }
  ]);
  adresses$ = this.adressesSubject.asObservable();

  showConfirmModal = false;
  confirmModalMessage = '';
  confirmModalAction: (() => void) | null = null;

  ngOnInit(): void {
    // Chargement des adresses si connecté à un service
    console.log('[Adresses] Component initialized with', this.adressesSubject.value.length, 'addresses');
  }

  ajouterAdresse(): void {
    this.confirmModalMessage = 'Voulez-vous ajouter une nouvelle adresse ?';
    this.confirmModalAction = () => {
      alert('Cette fonctionnalité sera connectée au backend.');
      this.closeConfirmModal();
    };
    this.showConfirmModal = true;
  }

  supprimerAdresse(id: number, titre: string): void {
    this.confirmModalMessage = `Êtes-vous sûr de vouloir supprimer l'adresse "${titre}" ?`;
    this.confirmModalAction = () => {
      const currentAdresses = this.adressesSubject.value;
      const newAdresses = currentAdresses.filter(a => a.id !== id);
      this.adressesSubject.next(newAdresses);
      this.closeConfirmModal();
    };
    this.showConfirmModal = true;
  }

  definirParDefaut(id: number, titre: string): void {
    this.confirmModalMessage = `Définir "${titre}" comme adresse par défaut ?`;
    this.confirmModalAction = () => {
      const currentAdresses = this.adressesSubject.value;
      const newAdresses = currentAdresses.map(a => ({
        ...a,
        principale: a.id === id
      }));
      this.adressesSubject.next(newAdresses);
      this.closeConfirmModal();
    };
    this.showConfirmModal = true;
  }

  confirmerAction(): void {
    if (this.confirmModalAction) {
      this.confirmModalAction();
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmModalMessage = '';
    this.confirmModalAction = null;
  }

}