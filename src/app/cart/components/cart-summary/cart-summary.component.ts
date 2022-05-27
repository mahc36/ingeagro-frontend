import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from "../../../shared/model/cart";
import {CartService} from "../../../shared/services/cart/cart.service";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {Subscription} from "rxjs";
import {SellProduct} from "../../../shared/model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit, OnDestroy {

  public cart: Cart | undefined;
  cartSubscription : Subscription | undefined;

  constructor(private cartService: CartService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
      if(this.cart && this.cart.id){
        this.cartSubscription = this.cartService.getACartById(this.cart.id).subscribe({
          next: value => {
            this.cart = value;
          },
          error: err => {
            this.alertService.showDanger('Ocurrió un problema al tratar de obtener el carrito para el resumen');
          }
        })
      }
    }
  }

  // TODO - set this method as a util method
  getTotalInCart(): number {
    let total = 0;
    this.cart?.products?.forEach(value => {
      if(value && value.quantity &&
        value.product && value.product?.price &&
        value.product?.stock?.initialQuantity){
        total = total + (value.quantity * Math.floor(value.product?.price / value.product?.stock?.initialQuantity));
      }
    });
    return total;
  }

  // TODO - set this method as a util method
  getTotalProductInCart(product: SellProduct | undefined ): number{
    let totalProductInCart = 0;
    if(product && product.quantity &&
      product.product && product.product.price && product.product.stock?.initialQuantity){
      totalProductInCart = (Math.floor(product.product.price / product.product.stock?.initialQuantity) * product.quantity)
    }
    return totalProductInCart;
  }

  buyCart(): void{
    this.router.navigate(['/cart-confirmation'])
  }

  goToList(): void {
    this.router.navigate(['/list'])
  }

  isThereProductsOnCar(): boolean {
    if(this.cart && this.cart.products){
      return this.cart.products.length > 0
    }
    return false;
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

}
