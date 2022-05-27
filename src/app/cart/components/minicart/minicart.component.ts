import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToggleminicartService } from "../../services/toggleminicart.service";
import { CartService } from "../../../shared/services/cart/cart.service";
import { AuthService } from "../../../auth/service/auth.service";
import { Profile } from "../../../shared/model/profile";
import { Cart } from "../../../shared/model/cart";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { SellProduct } from "../../../shared/model/product";
import { RemoveItemFromCartRequest } from "../../../shared/model/requests";
import {Router} from "@angular/router";

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.scss']
})
export class MinicartComponent implements OnInit, AfterViewChecked {

  expanded = false;

  cart: Cart | undefined;
  removeRequest: RemoveItemFromCartRequest | undefined;

  constructor(private toggleMiniCartService: ToggleminicartService,
              private cartService: CartService,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router) { }

  public closeMiniCart() : void {
    this.expanded = false;
    document.body.style.overflow = 'auto';
  }

  areThereProductsInCart(): boolean {
    return !!(this.cart && this.cart.products && this.cart.products.length > 0);

  }

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

  getTotalProductInCart(product: SellProduct | undefined ): number{
    let totalProductInCart = 0;
    if(product && product.quantity &&
      product.product && product.product.price && product.product.stock?.initialQuantity){
      totalProductInCart = (Math.floor(product.product.price / product.product.stock?.initialQuantity) * product.quantity)
    }
    return totalProductInCart;
  }

  goToCartOverview(): void {
    document.body.style.overflow = 'auto';
    this.router.navigate(['/cart-summary']);
  }

  removeProductFromCart(cartId: number | undefined, productId: number | undefined) : void {
    if(cartId && productId){
      this.removeRequest = undefined;
      this.removeRequest = {
        cartId,
        sellProductId : productId
      }
      this.cartService.removeProductFormCart(this.removeRequest).subscribe(
        value => {
          this.cart = value;
          this.alertService.showSuccess('Producto eliminado');
        },
        error => {
          if(error?.error?.error){
            this.alertService.showDanger(error.error.error);
          }
          else{
            this.alertService.showDanger('No se puede eliminar el item, intentalo más tarde');
          }
        }
      );
    }
    else{
      this.alertService.showDanger('No se puede eliminar el item, intentalo más tarde');
    }
  }

  ngOnInit(): void {
    this.miniCartToggle();
  }

  private miniCartToggle() {
    this.toggleMiniCartService.toggleMiniCartStatus.subscribe({
      next: value => {
        this.expanded = value;
        if(this.expanded){
          this.refreshCart();
        }
      }
    });
  }

  private refreshCart() {
    let cartId = 0;
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
    cartId = this.cart?.id ? this.cart?.id : 0;
    if (cartId > 0) {
      this.cartService.getACartById(cartId).subscribe({
        next: value1 => {
          this.cart = value1;
        },
        error: err => {
          this.alertService.showDanger('Ocurrió un problema tratando de refrescar el carrito');
        }
      })
    }
  }

  ngAfterViewChecked(): void {
    if(this.expanded){
      document.body.style.overflow = 'hidden';
    }
  }
}
