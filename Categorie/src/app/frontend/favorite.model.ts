export type ProductBadge = 'promo' | 'nouveau' | 'rupture' | null;

export interface Item {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image?: string;
  category: string;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
  badge?: ProductBadge;
  discountPercent?: number;
  inStock: boolean;
}

export interface Favorite {
  id: number;
  item: Item;
  createdAt: string;
}
