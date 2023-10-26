export class Wishlist {
  user_id: number;
  product_id: number;
  product_qty: number;
  created_at: string | null;
  updated_at: string | null;

  constructor(Wishlist?: Wishlist){
    this.user_id = Wishlist.user_id || 0;
    this.product_id = Wishlist.product_id || 0;
    this.product_qty = Wishlist.product_qty || 0;
    this.created_at = Wishlist.created_at || null;
    this.updated_at = Wishlist.updated_at || null;
  }
}