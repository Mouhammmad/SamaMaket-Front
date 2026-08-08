import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-infos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './boutique-infos.html',
  styleUrl: './boutique-infos.css'
})
export class BoutiqueInfos {

  @Input()
  boutique: any;

}