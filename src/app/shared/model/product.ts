import { Stock } from "./stock";
import { QuantityType } from "./quantity-type";
import { ProductType } from "./product-type";

export interface Product{
  id?: number;
  price?: number;
  stock?: Stock;
  quantityType?: QuantityType;
  description?: string;
  productType?: ProductType;
}

export interface ProductForm {
  product?: Product;
  sellerId?: number;
  updateProduct?: boolean;
}

export interface SellProduct {
  id?: number;
  quantity?: number;
  product?: Product;
}
