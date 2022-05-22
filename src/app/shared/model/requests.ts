export interface AddToCartRequest {
  cartId?: number;
  qty?: number;
  productId?: number;
  buyerId?: number;
}

export interface RemoveItemFromCartRequest{
  cartId?: number;
  sellProductId?: number;
}
