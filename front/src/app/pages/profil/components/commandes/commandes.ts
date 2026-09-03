import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommandeService } from '../../../../core/services/commandes';
import { ClientSectionService } from '../../../../core/services/client-section';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes implements OnInit, OnDestroy {

  // Search and filter properties
  searchTerm: string = '';
  filterStatut: string = 'tous';

  private commandesSubject = new BehaviorSubject<any[]>([]);
  commandes$ = this.commandesSubject.asObservable();

  private chargementSubject = new BehaviorSubject(true);
  chargement$ = this.chargementSubject.asObservable();

  private messageSubject = new BehaviorSubject('');
  message$ = this.messageSubject.asObservable();

  private statsSubject = new BehaviorSubject({
    total: 0,
    enCours: 0,
    livrees: 0,
    annulees: 0
  });
  stats$ = this.statsSubject.asObservable();

  private searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private filterStatutSubject = new BehaviorSubject('tous');
  filterStatut$ = this.filterStatutSubject.asObservable();

  filteredCommandes$ = combineLatest([
    this.commandes$,
    this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.filterStatut$
  ]).pipe(
    map(([commandes, searchTerm, filterStatut]) => 
      this.applyFilters(commandes, searchTerm, filterStatut)
    )
  );

  private sectionSub = new Subscription();

  constructor(
    private commandeService: CommandeService,
    private sectionService: ClientSectionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to section changes
    this.sectionSub.add(
      this.sectionService.section$.subscribe(section => {
        if (section === 'commandes') {
          this.chargerCommandes();
        }
      })
    );
    
    // Load commandes immediately on init
    this.chargerCommandes();
  }

  ngOnDestroy(): void {
    this.sectionSub.unsubscribe();
  }

  chargerCommandes(): void {
    console.log('[Commandes] chargerCommandes() called');
    this.chargementSubject.next(true);
    this.messageSubject.next('');
    console.log('[Commandes] Starting to load commandes...');
    this.commandeService.getMesCommandes().subscribe({
      next: (data: any) => {
        console.log('[Commandes] NEXT callback fired');
        console.log('[Commandes] Data received:', data);
        const newCommandes = Array.isArray(data) ? data : data.results || [];
        console.log('[Commandes] About to set commandes');
        this.commandesSubject.next(newCommandes);
        console.log('[Commandes] commandes set to:', newCommandes.length, 'items');
        console.log('[Commandes] About to call calculerStatistiques()');
        this.calculerStatistiques();
        console.log('[Commandes] calculerStatistiques() completed');
        console.log('[Commandes] About to set chargement to false');
        this.chargementSubject.next(false);
        console.log('[Commandes] chargement set to false');
      },
      error: (err: any) => {
        console.error('[Commandes] ERROR callback fired:', err);
        this.messageSubject.next('Impossible de charger vos commandes pour le moment.');
        this.commandesSubject.next([]);
        this.chargementSubject.next(false);
      },
      complete: () => {
        console.log('[Commandes] COMPLETE callback fired');
      }
    });
    console.log('[Commandes] subscription created');
  }

  calculerStatistiques(): void {
    const commandes = this.commandesSubject.value;
    const newStats = {
      total: commandes.length,
      enCours: commandes.filter(c => ['en_attente', 'confirme', 'expedie'].includes(c.statut)).length,
      livrees: commandes.filter(c => c.statut === 'livre').length,
      annulees: commandes.filter(c => c.statut === 'annule').length
    };
    this.statsSubject.next(newStats);
    console.log('[Commandes] Stats updated:', newStats);
  }

  onSearchChange(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  onFilterStatutChange(statut: string): void {
    this.filterStatutSubject.next(statut);
  }

  private applyFilters(commandes: any[], searchTerm: string, filterStatut: string): any[] {
    return commandes.filter(commande => {
      // Filtre par statut
      if (filterStatut !== 'tous' && commande.statut !== filterStatut) {
        return false;
      }

      // Filtre par recherche (numéro, date, adresse)
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchNumber = commande.numero?.toLowerCase().includes(lowerSearch) || 
                          String(commande.id).includes(lowerSearch);
        const matchDate = commande.date_creation?.includes(searchTerm);
        const matchAdresse = commande.adresse_livraison?.toLowerCase().includes(lowerSearch);
        
        if (!matchNumber && !matchDate && !matchAdresse) {
          return false;
        }
      }

      return true;
    });
  }

  libelleStatut(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'confirme': return 'Confirmée';
      case 'expedie': return 'Expédiée';
      case 'livre': return 'Livrée';
      case 'annule': return 'Annulée';
      default: return statut || 'Inconnu';
    }
  }

}
