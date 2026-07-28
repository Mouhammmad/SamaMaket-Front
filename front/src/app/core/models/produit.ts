export interface Produit {

  id: number;

  nom: string;

  description?: string;

  prix: number | string;

  quantite_stock: number;

  image?: string;

  image_url?: string;

  categorie?: string;

  boutique?: string;

  boutique_id?: number;

  est_actif?: boolean;

  date_creation?: string;

  /* --------- FUTUR --------- */

  note?: number;

  nombreAvis?: number;

  estPromo?: boolean;

  estNouveau?: boolean;

}