import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../shared/model/cart";
import {CartService} from "../../../shared/services/cart/cart.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {AuthService} from "../../../auth/service/auth.service";

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: ['./cart-confirmation.component.scss']
})
export class CartConfirmationComponent implements OnInit {

  cart: Cart | undefined;

  constructor(private cartService: CartService,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService) { }

  goToProductList(): void {
    this.router.navigate(['/list']);
  }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
    if(this.cart && this.cart.id){
      this.cartService.finishBuy(this.cart?.id).subscribe({
        next: value => {
          localStorage.removeItem('cart');
          this.authService.getANewCartForProfile();
        },
        error: err => {
          if(err?.error?.error){
            this.alertService.showDanger(err.error.error);
          }
          else{
            this.alertService.showDanger('No se pudo finalizar su compra');
          }
          this.router.navigate(['cart-summary']);
        }
      });
    }


  }

}
