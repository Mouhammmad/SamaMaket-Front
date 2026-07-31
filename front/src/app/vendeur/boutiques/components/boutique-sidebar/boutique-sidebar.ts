import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-sidebar.html',
  styleUrl: './boutique-sidebar.css'
})
export class BoutiqueSidebar {

  @Input() boutique: any;

}