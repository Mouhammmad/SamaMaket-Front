import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../../core/services/admin.service';

@Component({

selector:'app-admin-utilisateurs',

standalone:true,

imports:[
CommonModule,
FormsModule,
RouterLink
],

templateUrl:'./utilisateurs.html',

styleUrl:'./utilisateurs.css'

})

export class Utilisateurs implements OnInit{

utilisateurs:any[]=[];

recherche='';

constructor(

private admin:AdminService,
private cdr: ChangeDetectorRef

){}

ngOnInit(){

this.charger();

}

charger(){

this.admin

.getUtilisateurs(this.recherche)

.subscribe(data=>{

this.utilisateurs=data;
this.cdr.detectChanges();

});

}

}