import { IdentificationType } from "./identification-type";
import { Gender } from "./gender";

export interface Person{
  firstName?: String;
  lastName?: String;
  bornDate?: Date;
  identificationNumber?: String;
  identificationType?: IdentificationType;
  gender?: Gender;
}
