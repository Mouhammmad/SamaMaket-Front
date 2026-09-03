export interface Utilisateur {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role?: string;
  date_joined?: string;
  ville?: string;
  adresse?: string;
  photo?: string;
  notif_commandes?: boolean;
  notif_promos?: boolean;
  notif_favoris?: boolean;
  notif_newsletter?: boolean;
}