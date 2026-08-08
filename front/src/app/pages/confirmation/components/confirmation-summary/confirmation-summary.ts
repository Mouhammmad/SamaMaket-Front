import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-summary.html',
  styleUrl: './confirmation-summary.css'
})
export class ConfirmationSummary {

  @Input() commande: any;

}