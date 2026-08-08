import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AdminService } from '../../../../core/services/admin.service';

@Component({

selector:'app-vendeur-detail',

standalone:true,

imports:[
CommonModule
],

templateUrl:'./vendeur-detail.html',

styleUrl:'./vendeur-detail.css'

})

export class VendeurDetail implements OnInit{

boutique:any;

constructor(

private route:ActivatedRoute,

private admin:AdminService

){}

ngOnInit(){

  this.chargerBoutique();

}
approuver() {

  this.admin
    .validerBoutique(this.boutique.id, true)
    .subscribe(() => {

      this.chargerBoutique();

    });

}

refuser() {

  this.admin
    .validerBoutique(this.boutique.id, false)
    .subscribe(() => {

      this.chargerBoutique();

    });

}
chargerBoutique() {

  const id = this.route.snapshot.params['id'];

  this.admin.getBoutique(id).subscribe((data: any) => {

    this.boutique = data;

  });

}
}