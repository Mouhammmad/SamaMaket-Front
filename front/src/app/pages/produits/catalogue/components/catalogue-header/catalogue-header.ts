import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './catalogue-header.html',
  styleUrl: './catalogue-header.css'
})
export class CatalogueHeader {

  @Input()
  total = 0;

  @Input()
  tri = 'pertinence';

  @Input()
  filtres: { key: string; label: string }[] = [];

  @Output()
  changerTri = new EventEmitter<string>();

  @Output()
  supprimerFiltre = new EventEmitter<string>();

  onTriChange() {

    this.changerTri.emit(this.tri);

  }
@Output()

recherche = new EventEmitter<string>();
texte = "";

chercher(){

    this.recherche.emit(this.texte);

}
}