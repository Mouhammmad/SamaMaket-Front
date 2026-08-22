export interface LigneCommande {
  id?: number;
  produitId?: number;
  produit: {
    id: number;
    nom: string;
    image?: string | null;
  };
  nom?: string;
  image?: string;
  prix?: number | string;
  prix_unitaire: number | string;
  total: number | string;
  quantite: number;
}

export interface Commande {

  id: number;

  numero: string;

  date?: string;
  date_creation?: string;
  statut: string;
  total: number | string;
  sous_total?: number | string;
  frais_livraison?: number | string;
  reduction?: number | string;
  mode_livraison?: string;
  mode_paiement: string | null;
  adresse_livraison?: string;
  client?: string;
  email?: string;
  telephone?: string | null;
  nombre_produits?: number;
  lignes: LigneCommande[];
  produits?: LigneCommande[];
  paiement?: unknown;
  boutique?: number | null;
}