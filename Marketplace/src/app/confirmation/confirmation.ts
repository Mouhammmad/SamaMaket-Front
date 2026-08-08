import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.scss']
})
export class ConfirmationComponent implements OnInit {
  commandeId: string | null = null;
  message = 'Vous serez redirigé vers Mes commandes dans quelques secondes.';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const queryParams = new URLSearchParams(window.location.search);
    this.commandeId = queryParams.get('commande_id');
    setTimeout(() => {
      this.router.navigate(['/mes-commandes']);
    }, 5000);
  }
}
