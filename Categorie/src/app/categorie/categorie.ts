import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Produit, Categorie } from '../data';
import { FormsModule} from '@angular/forms';
// 1.Définition de la structure d'un produit(interface)


@Component({
  selector: 'app-categorie',
  standalone:true, // Indique qu'il s'agit d'un composant autonome
  imports: [FormsModule, CommonModule], //Ajout du CommonModule ici pour activer les directives HTML
  templateUrl: './categorie.html',
  styleUrl: './categorie.scss',
})


export class CategorieComponent implements OnInit {
  searchText: string = '';
  tousLesProduits: Produit[] = [];

  categorieActive!: Categorie;
  // 2. Liste des catégories pour le menu gauche
  categories: any[] = [];
  categorieSelectionnee: string = '';
   produits: Produit[] = [];
  constructor(private dataService: DataService) {}
  // Cette fonction s'excute automatiquement au chargement du composant
  ngOnInit(): void {
    this.chargerCategoriesDepuisDjango();
  }
  
  chargerCategoriesDepuisDjango(): void {
    this.dataService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
    
        if (this.categories && this.categories.length>0) {
          const categoriesReelles = this.categories.filter((cat: any) => cat.nom );
          const total = this.calculerTotalProduits(categoriesReelles);

          this.categories[0].count = total;
        }

        this.chargerLesProduitsDepuisDjango();
      },
       error: (err: any) => {
        console.error('Erreur API catégories :',err);
      }
    });
  }
  chargerLesProduitsDepuisDjango(): void {
   this.dataService.getProduits().subscribe({
    next: (data: any) => {
      this.tousLesProduits = data;
      this.produits = [ ...this.tousLesProduits];
      console.log('Produits Chargés :', this.tousLesProduits);
    },
    error: (err: any) => {
      console.error('Erreur produits Django :', err);
    }

   });
  }
 
  filtrerProduits(): void {
    const formatText = this.searchText ? this.searchText.toLowerCase().trim(): '';

    if (formatText === '') {
      this.produits = [...this.tousLesProduits];
      return;
    }

    this.produits = this.tousLesProduits.filter((item: any) => {
      const matchNom = item.nom ? item.nom.toLowerCase().includes(formatText):false;
      const matchDescription = item.description ? item.description.toLowerCase().includes(formatText): false;
      
      //Recherche dans le nom de la categorie 
      const matchCategorie = item.categorie && item.categorie.nom
      ? item.categorie.nom.toLocaleLowerCase().includes(formatText)
      : false;

      return matchNom || matchDescription ||matchCategorie;
        
    });
  }
   
  changerCategorie(nomCat: string): void {
    this.categorieSelectionnee = nomCat;
    this.searchText = '';
  }   
  

  get filtrerproduits(): Produit[] {
    let resultat = this.tousLesProduits;

    if(this.categorieSelectionnee && this.categorieSelectionnee !== 'Toutes') {
      resultat = resultat.filter((p: Produit) => p.categorie.nom   ===this.categorieSelectionnee);
    }
    
    if (this.searchText && this.searchText.trim() !== '') {
      const recherche = this.searchText.toLocaleLowerCase().trim();
      resultat = resultat.filter((p: Produit) =>p.nom.toLocaleLowerCase().includes(recherche));
    }

    return resultat;
  }

   
  calculerTotalProduits(categoriesList: any[]): number {
    return categoriesList.reduce((sum, cat) => sum + Number(cat.count || 0), 0 );

  }

  produitsFilters(): any[] {
    return this.produits;
  }
  ajouterAuPanier(produit: any): void {
    console.log('produit ajouté au panier :', produit);
    alert(`${produit.nom} a été ajouté au panier !`);
  }
}