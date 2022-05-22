import { Component, OnInit } from '@angular/core';
import { ToggleminicartService } from "../../services/toggleminicart.service";
import { CartService } from "../../../shared/services/cart/cart.service";
import { AuthService } from "../../../auth/service/auth.service";
import { Profile } from "../../../shared/model/profile";
import { Cart } from "../../../shared/model/cart";
import { AlertService } from "../../../shared/services/alert/alert.service";

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.scss']
})
export class MinicartComponent implements OnInit {

  expanded = false;

  profile: Profile | undefined;
  cart: Cart | undefined;

  constructor(private toggleMiniCartService: ToggleminicartService,
              private cartService: CartService,
              private authService: AuthService,
              private alertService: AlertService) { }

  public closeMiniCart() : void {
    this.expanded = false;
  }

  areThereProductsInCart(): boolean {
    return !!(this.cart && this.cart.products && this.cart.products.length > 0);

  }

  ngOnInit(): void {
    this.miniCartToggle();
    if(this.authService.isLoggedIn()){
      // retrieve cart o get a new one
      this.profile = this.authService.currentUserProfileValue;
    }
    else{
      // retrieve a new cart
      this.profile = this.authService.currentGuestProfileValue;
      if(!this.cart && !localStorage.getItem('cart')){
        this.getANewCartForGuest();
      }
    }
  }

  private getANewCartForGuest() {
    this.cartService.getANewCart(this.profile?.buyer?.id).subscribe({
      next: value => {
        this.cart = value;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      },
      error: err => {
        this.alertService.showDanger('Ocurrió un problema al trater de crear un guest cart');
      }
    });
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
    if (this.cart) {
      cartId = this.cart?.id ? this.cart?.id : 0;
    } else {
      let cart = localStorage.getItem('cart');
      if (cart) {
        this.cart = JSON.parse(cart);
      }
      cartId = this.cart?.id ? this.cart?.id : 0;
    }
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
}