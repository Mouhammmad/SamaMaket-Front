import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1.Définition de la structure d'un produit(interface)
interface Produit{
  id: number;
  nom: string;
  badge: 'Promo';
  reduction: string;
  image: string;
  categorie: string;
  prix: number;
  prixOriginal: number;
  note: number;
}

@Component({
  selector: 'app-categorie',
  standalone:true, // Indique qu'il s'agit d'un composant autonome
  imports: [CommonModule], //Ajout du CommonModule ici pour activer les directives HTML
  templateUrl: './categorie.html',
  styleUrl: './categorie.scss',
})


export class CategorieComponent implements OnInit {
  // 2. Liste des catégories pour le menu gauche
  categories = [
    { nom: 'Tous les produits', count:0 },
    { nom: 'Mode & Tissu', count: 487},
    { nom: 'Alimentation', count:312},
    { nom: 'Artisanat', count: 245 },
    { nom: 'Beauté', count: 198 },
    { nom: 'Electronique', count: 156 },
    { nom:' maison & Déco', count: 134 }
  ];

  // Cette fonction s'excute automatiquement au chargement du composant
  ngOnInit(): void {
    const categoriesReelles = this.categories.filter(cat => cat.nom !== 'Tous les produits');
    const total = this.calculerTotalProduits(categoriesReelles);
    this.categories[0].count = total;
  }

    //  exemple de calcul dynamique dans votre composant 
  calculerTotalProduits(categories: any[]): number {
    return categories.reduce((sum, cat) => sum + Number(cat.count || 0), 0 );
  }
  //La fonction de calcul corrigée 
  categorieSelectionnee: any = 'Tous les produits';
//Simulation des données de l'image(SamaMarket)
produits: any[] = [
  {
    id:1,
    nom: 'Echarpe Bas=zin Riche',
    badge:'Promo',
    image:'https://placeholder.com',
    categorie: 'Mode et Tissu',
    prix: 12500,
    prixOriginal:15000,
    note: 3
  },
  {
    id:2,
    nom: 'Miel de Casamance',
    badge: 'Promo',
    reduction: '-20%',
    image: 'https://placeholder.com',
    categorie: 'Alimentation',
    prix: 3200,
    prixOriginal:4000,
    note: 5,
  },
  {
    id: 3,
    nom: 'Robe Wax Ankara',
    badge: 'Nouveau',
    image: 'https://placeholder.com',
    categorie: 'Mode et Tissu',
    prix: 22000,
    note:5
  },
  {
    id:4,
    nom: 'Tableau Artisanal',
    badge:'Nouveau',
    image:'https://placeholder.com',
    categorie: 'Mode et Tissu',
    prix: 18000,
    prixOriginal:20000,
    note: 3
  },
  {
    id:5,
    nom: 'Boubou Brodé',
    badge:'Promo',
    image:'https://placeholder.com',
    categorie: 'Mode et Tissu',
    prix: 35000,
    prixOriginal:42000,
    note: 6
  },
  {
    id:6,
    nom: 'Pagne tressé',
    badge:'Nouveau',
    image:'https://placeholder.com',
    categorie: 'Artisanat',
    prix: 8500,
    prixOriginal:10000,
    note: 4
  },
];

 
  // 4. Fonction appelée lors du clic sur une catégorie
changerCategorie(nom: string): void {
  this.categorieSelectionnee = nom;
}


 produitsFilters(): any[] {

  if(!this.categorieSelectionnee || this.categorieSelectionnee ==='Tous les produits') {
    return this.produits;
  }
  return this.produits.filter(item => item.categorie === this.categorieSelectionnee);
} 
}  