import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-analytics.html',
  styleUrl: './promotion-analytics.css'
})
export class PromotionAnalytics {

  @Input() promotions:any[]=[];

  getPromotionMax(){

    if(!this.promotions.length){

      return null;

    }

    return [...this.promotions].sort(

      (a,b)=>b.taux_remise-a.taux_remise

    )[0];

  }

  getPromotionMin(){

    if(!this.promotions.length){

      return null;

    }

    return [...this.promotions].sort(

      (a,b)=>a.taux_remise-b.taux_remise

    )[0];

  }

  moyenneRemise(){

    if(!this.promotions.length){

      return 0;

    }

    const total=this.promotions.reduce(

      (s,p)=>s+Number(p.taux_remise),

      0

    );

    return (total/this.promotions.length).toFixed(1);

  }

}