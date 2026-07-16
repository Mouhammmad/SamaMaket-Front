import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit {
  listeProduits: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProduits().subscribe({
      next: (data) =>this.listeProduits = data,
      error: (err) => console.error('Erreur de connexion', err)
    })
  }
  protected readonly title = signal('Categorie');
}
