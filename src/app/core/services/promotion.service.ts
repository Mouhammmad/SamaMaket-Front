import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  appliquer(code: string) {
    return this.http.post(`${this.apiUrl}/promotions/appliquer/`, { code });
  }
}