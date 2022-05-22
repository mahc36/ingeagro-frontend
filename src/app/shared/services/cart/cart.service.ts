import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../model/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private getANewCartUrl: string = `${environment.apiURL}/cart/getANewCart`;

  constructor(private httpClient: HttpClient) { }

  public getANewCart(buyerId: number | undefined): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.getANewCartUrl}?buyerId=${buyerId}`);
  }
}
