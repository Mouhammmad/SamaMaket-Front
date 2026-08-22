import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-offres-header',
  standalone: true,
  templateUrl: './offres-header.html',
  styleUrl: './offres-header.css'
})
export class OffresHeader {

  @Output()
  recherche = new EventEmitter<string>();

  @Output()
  filtre = new EventEmitter<string>();


  rechercher(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.recherche.emit(
      input.value
    );

  }


  changerFiltre(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.filtre.emit(
      select.value
    );

  }

}