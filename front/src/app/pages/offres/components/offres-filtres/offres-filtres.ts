import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-offres-filtres',
  standalone: true,
  templateUrl: './offres-filtres.html',
  styleUrl: './offres-filtres.css'
})
export class OffresFiltres {

  @Output()
  recherche = new EventEmitter<string>();

  @Output()
  typeRemise = new EventEmitter<string>();

  @Output()
  boutique = new EventEmitter<string>();

  @Output()
  reset = new EventEmitter<void>();


  rechercher(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.recherche.emit(
      input.value
    );

  }


  changerTypeRemise(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.typeRemise.emit(
      select.value
    );

  }


  rechercherBoutique(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.boutique.emit(
      input.value
    );

  }


  reinitialiser(): void {

    this.reset.emit();

  }

}