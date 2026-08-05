export interface Produits {
  id: number;
  nom: string;
  description: string;
  prix: string;
  image: string;
  image_url: string | null;
  categorie: string;
  boutique_id: number;
  boutique: string;
  est_actif: boolean;
  date_creation: string;
}