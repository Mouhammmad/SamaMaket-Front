import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-boutique-avis',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./boutique-avis.html',
  styleUrl:'./boutique-avis.css'
})
export class BoutiqueAvis{

    @Input()

    avis:any[]=[];

}