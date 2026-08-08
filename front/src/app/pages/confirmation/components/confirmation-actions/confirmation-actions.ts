import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-actions',
  standalone: true,
  templateUrl: './confirmation-actions.html',
  styleUrl: './confirmation-actions.css'
})
export class ConfirmationActions {

  @Output()
  facture = new EventEmitter<void>();

  @Output()
  suivi = new EventEmitter<void>();

  @Output()
  accueil = new EventEmitter<void>();

}