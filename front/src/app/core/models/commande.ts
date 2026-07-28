export interface LigneCommande {

  produitId: number;

  nom: string;

  image: string;

  prix: number;

  quantite: number;

}

export interface Commande {

  id: number;

  numero: string;

  date: string;

  statut: 'EN_ATTENTE' | 'PREPARATION' | 'EXPEDIEE' | 'LIVREE' | 'ANNULEE';

  total: number;

  produits: LigneCommande[];

}