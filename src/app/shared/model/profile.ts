import { Seller } from "./seller";
import { Buyer } from "./buyer";
import { User } from "./user";

export interface Profile{
  seller?: Seller;
  buyer?: Buyer;
  user?: User;
}
