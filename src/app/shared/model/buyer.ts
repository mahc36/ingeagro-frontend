import { User } from "./user";
import { GuestUser } from "./guest-user";

export interface Buyer{

  id?: number;
  isGuest?: boolean;
  user?: User;
  guestUser?: GuestUser;

}
