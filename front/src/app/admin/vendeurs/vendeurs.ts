import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';

@Component({

selector:'app-admin-vendeurs',

standalone:true,

imports:[
CommonModule,
RouterLink
],

templateUrl:'./vendeurs.html',

styleUrl:'./vendeurs.css'

})

export class Vendeurs implements OnInit{

boutiques:any[]=[];

constructor(

private admin:AdminService

){}

ngOnInit(){

this.admin

.getBoutiques()

.subscribe(data=>{

this.boutiques=data;

});

}

}