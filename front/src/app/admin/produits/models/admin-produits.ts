export interface ProduitAdmin {

  id: number;

  nom: string;

  description: string;

  prix: number;

  image_url: string;

  categorie: string;

  boutique: string;

  quantite_stock: number;

  est_actif: boolean;

  date_creation: string;

  nombre_favoris: number;

  nombre_avis: number;

  note_moyenne: number;

}