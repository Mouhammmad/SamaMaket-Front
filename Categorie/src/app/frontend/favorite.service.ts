import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Item, Favorite } from './favorite.model';

const API_URL = '/api/v1/favorites/';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  // Ensemble des item.id actuellement favoris, partagé par tous les boutons cœur
  private favoriteIdsSubject = new BehaviorSubject<Set<number>>(new Set());
  favoriteIds$ = this.favoriteIdsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Item[]> {
    return this.http.get<Favorite[]>(API_URL).pipe(
      map((favorites) => favorites.map((f) => f.item)),
      tap((items) => {
        this.favoriteIdsSubject.next(new Set(items.map((i) => i.id)));
      }),
    );
  }

  addFavorite(itemId: number): Observable<Favorite> {
    return this.http.post<Favorite>(API_URL, { item: itemId }).pipe(
      tap(() => {
        const current = new Set(this.favoriteIdsSubject.value);
        current.add(itemId);
        this.favoriteIdsSubject.next(current);
      }),
    );
  }

  removeFavorite(itemId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}${itemId}/`).pipe(
      tap(() => {
        const current = new Set(this.favoriteIdsSubject.value);
        current.delete(itemId);
        this.favoriteIdsSubject.next(current);
      }),
    );
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteIdsSubject.value.has(itemId);
  }

  /** Mise à jour optimiste immédiate, avant même la réponse HTTP */
  setOptimistic(itemId: number, isFavorite: boolean): void {
    const current = new Set(this.favoriteIdsSubject.value);
    isFavorite ? current.add(itemId) : current.delete(itemId);
    this.favoriteIdsSubject.next(current);
  }
}
