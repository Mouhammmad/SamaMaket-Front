import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../core/services/admin.service';

@Component({

selector:'app-utilisateur-detail',

standalone:true,

imports:[
CommonModule,
RouterLink
],

templateUrl:'./utilisateur-detail.html',

styleUrl:'./utilisateur-detail.css'

})

export class UtilisateurDetail implements OnInit{

utilisateur:any;

constructor(

private route:ActivatedRoute,

private admin:AdminService,
private router:Router

){}

ngOnInit(){

const id=this.route.snapshot.params['id'];

this.admin

.getUtilisateur(id)

.subscribe(data=>{

this.utilisateur=data;

});

}
suspendre(){

this.admin

.suspendreUtilisateur(this.utilisateur.id)

.subscribe(()=>{

alert("Utilisateur suspendu");

this.utilisateur.is_active=false;

});

}

reactiver(){

this.admin

.reactiverUtilisateur(this.utilisateur.id)

.subscribe(()=>{

alert("Utilisateur réactivé");

this.utilisateur.is_active=true;

});

}

supprimer(){

if(confirm("Supprimer cet utilisateur ?")){

this.admin

.supprimerUtilisateur(this.utilisateur.id)

.subscribe(()=>{

alert("Utilisateur supprimé");

this.router.navigate(['/admin/utilisateurs']);

});

}

}
}