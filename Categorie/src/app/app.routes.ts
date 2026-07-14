import { Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie';

export const routes: Routes = [
    {path: 'categorie', component: CategorieComponent},
    {path: '', redirectTo: '/categorie', pathMatch: 'full' } // Redirige automatiquement l'accueil vers la catégorie
];
