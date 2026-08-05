export interface Produit {

  id: number;

  nom: string;

  description: string;

  prix: number;

  prix_promo: number;

  promotion_active: any;

  image: string;

  image_url: string;

  categorie: string;

  boutique: string;

  boutique_id: number;

  quantite_stock: number;

  est_actif: boolean;

  nombre_favoris: number;

  nombre_avis: number;

  note_moyenne: number;

  images: any[];

  variantes: any[];

  est_favori?: boolean;

}