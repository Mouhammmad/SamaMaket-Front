import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSectionService {

  private currentSection = new BehaviorSubject<string>('profil');

  section$ = this.currentSection.asObservable();

  changeSection(section: string): void {
    this.currentSection.next(section);
  }

}