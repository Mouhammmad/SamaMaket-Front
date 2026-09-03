import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';

export interface Boutique {
  id: number;

  nom: string;
  description: string;
  ville: string;
  pays?: string;

  telephone?: string;
  email?: string;
  whatsapp?: string;

  logo?: string;
  logo_url?: string;

  banniere?: string;
  banniere_url?: string;

  note: number;
  followers: number;
  abonnes?: number;
  ventes: number;

  apprové: boolean;
  verifie: boolean;

  categorie?: string;
  categories?: any[];

  nombre_produits?: number;
  nombre_avis?: number;
  repartition_notes?: any;
  total_produits?: number;
}

export interface StatutSuivi {
  suivi: boolean;
  followers: number;
}
export interface Conversation {
  id: number;
  client: number;
  client_nom?: string;
  boutique: number;
  boutique_nom: string;
  boutique_logo?: string;
  date_creation: string;
  derniere_activite: string;
  dernier_message?: {
    id: number;
    conversation: number;
    expediteur: number;
    expediteur_nom: string;
    contenu: string;
    lu: boolean;
    date_envoi: string;
  } | null;
}
export interface ReponseSuivi {
  suivi: boolean;
  followers: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private apiUrl = '/api/boutiques/';
  private maBoutiqueRequest$?: Observable<Boutique>;

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================================
  // BOUTIQUES
  // ==========================================================

  getBoutiques(): Observable<Boutique[]> {

    return this.http.get<Boutique[]>(
      this.apiUrl
    );

  }

  getBoutique(id: number): Observable<Boutique> {

    return this.http.get<Boutique>(
      `${this.apiUrl}${id}/`
    );

  }

  getProduitsBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/produits/`);
  }

  getAvisBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/avis/`);
  }

  getPromotionsBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/promotions/`);
  }

  // ==========================================================
  // MA BOUTIQUE
  // ==========================================================

  getMaBoutique(): Observable<Boutique> {

    if (!this.maBoutiqueRequest$) {
      this.maBoutiqueRequest$ = this.http.get<Boutique>(
        `${this.apiUrl}ma/`
      ).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }

    return this.maBoutiqueRequest$;

  }

  private invaliderMaBoutiqueCache(): void {

    this.maBoutiqueRequest$ = undefined;

  }

  // ==========================================================
  // CREER UNE BOUTIQUE
  // ==========================================================

  creerBoutique(
    data: FormData
  ): Observable<Boutique> {

    return this.http.post<Boutique>(
      `${this.apiUrl}create/`,
      data
    ).pipe(
      tap(() => this.invaliderMaBoutiqueCache())
    );

  }

  // ==========================================================
  // MODIFIER UNE BOUTIQUE
  // ==========================================================

  modifierBoutique(
    id: number,
    data: FormData
  ): Observable<Boutique> {

    return this.http.put<Boutique>(
      `${this.apiUrl}ma/`,
      data
    ).pipe(
      tap(() => this.invaliderMaBoutiqueCache())
    );

  }

  // ==========================================================
  // SUIVRE UNE BOUTIQUE
  // ==========================================================

  suivreBoutique(
    boutiqueId: number
  ): Observable<ReponseSuivi> {

    return this.http.post<ReponseSuivi>(
      `${this.apiUrl}${boutiqueId}/suivre/`,
      {}
    );

  }

  // ==========================================================
  // NE PLUS SUIVRE UNE BOUTIQUE
  // ==========================================================

  nePlusSuivreBoutique(
    boutiqueId: number
  ): Observable<ReponseSuivi> {

    return this.http.delete<ReponseSuivi>(
      `${this.apiUrl}${boutiqueId}/suivre/`
    );

  }

  // ==========================================================
  // STATUT DU SUIVI
  // ==========================================================

  getStatutSuivi(
    boutiqueId: number
  ): Observable<StatutSuivi> {

    return this.http.get<StatutSuivi>(
      `${this.apiUrl}${boutiqueId}/suivi/`
    );

  }
// ==========================================================
// CONTACTER UNE BOUTIQUE
// ==========================================================

// ==========================================================
// CONTACTER UNE BOUTIQUE
// ==========================================================

contacterBoutique(
  boutiqueId: number
): Observable<{
  conversation: Conversation;
  nouvelle: boolean;
}> {

  return this.http.post<{
    conversation: Conversation;
    nouvelle: boolean;
  }>(
    `/api/messages/boutiques/${boutiqueId}/contacter/`,
    {}
  );

}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>('/api/messages/conversations/');
  }

  getConversationMessages(conversationId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `/api/messages/conversations/${conversationId}/messages/`
    );
  }

  envoyerMessage(conversationId: number, contenu: string): Observable<any> {
    return this.http.post<any>(
      `/api/messages/conversations/${conversationId}/messages/envoyer/`,
      { contenu }
    );
  }
}