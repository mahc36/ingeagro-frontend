import { SellProduct } from "./product";
import { Buyer } from "./buyer";

export interface Cart{
  id?: number;
  products?: SellProduct[];
  user?: Buyer;
}
