export class Cart{
  userId: number;
  productId: number;
  productQty: number;
  created_at: string | null;
  updated_at: string | null;
  transaction_id: number;

  constructor(Cart?: Cart) {
    this.userId = Cart.userId || 0;
    this.productId = Cart.productId || 0;
    this.productQty = Cart.productQty || 0;
    this.created_at = Cart.created_at || null;
    this.updated_at = Cart.updated_at || null;
    this.transaction_id = Cart.transaction_id || null;
  }
}