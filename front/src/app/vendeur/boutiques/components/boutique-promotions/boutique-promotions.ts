import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({

selector:'app-boutique-promotions',

standalone:true,

imports:[CommonModule],

templateUrl:'./boutique-promotions.html',

styleUrl:'./boutique-promotions.css'

})

export class BoutiquePromotions{

@Input()

promotions:any[]=[];

}