import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../model/cart";
import {AddToCartRequest, RemoveItemFromCartRequest} from "../../model/requests";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private getANewCartUrl: string = `${environment.apiURL}/cart/getANewCart`;
  private addProductToCartUrl: string = `${environment.apiURL}/cart/addProduct`;
  private getACartUrl: string = `${environment.apiURL}/cart/getACart`;
  private removeProductFromCartUrl: string = `${environment.apiURL}/cart/removeItem`;
  private buyCartUrl: string = `${environment.apiURL}/cart/buy`;

  constructor(private httpClient: HttpClient) { }

  public getANewCart(buyerId: number | undefined): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.getANewCartUrl}?buyerId=${buyerId}`);
  }

  public addProductToCart(request: AddToCartRequest | undefined): Observable<Cart>{
    return this.httpClient.post<Cart>(this.addProductToCartUrl, request);
  }

  public getACartById(cartId: number) : Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.getACartUrl}?cartId=${cartId}`);
  }

  public removeProductFormCart(request: RemoveItemFromCartRequest) : Observable<Cart> {
    return this.httpClient.post<Cart>(this.removeProductFromCartUrl, request);
  }

  public finishBuy(cartId: number): Observable<Cart> {
    return this.httpClient.post<Cart>(this.buyCartUrl, { cartId } );
  }

}
