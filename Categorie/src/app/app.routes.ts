import { Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie';
import { CommandeComponent } from './commande/commande';
export const routes: Routes = [
    {path: 'categorie', component: CategorieComponent},
    { path: 'commande', component: CommandeComponent},
    {path: '', redirectTo: 'catego', pathMatch: 'full' } // Redirige automatiquement l'accueil vers la catégorie
];
