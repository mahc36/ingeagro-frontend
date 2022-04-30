export interface User{
  username: String;
  password: String;
  person: Person;
}

export interface Person{
  firstName: String;
  lastName: String;
  bornDate: Date;
  identificationNumber: String;
  identificationType: number;
  gender: number;
}
