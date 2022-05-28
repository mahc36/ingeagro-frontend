import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../../../../product/services/product.service";
import { Product } from "../../../../shared/model/product";
import { Subscription } from "rxjs";
import { AlertService } from "../../../../shared/services/alert/alert.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AddToCartRequest} from "../../../../shared/model/requests";
import {Cart} from "../../../../shared/model/cart";
import {AuthService} from "../../../../auth/service/auth.service";
import {CartService} from "../../../../shared/services/cart/cart.service";
import {ToggleminicartService} from "../../../services/toggleminicart.service";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  @Input() productId: number | undefined;
  product: Product | undefined;
  productSubscription : Subscription | undefined;
  addToCartRequest : AddToCartRequest | undefined;
  cart: Cart | undefined;

  addToCartForm: FormGroup;
  maxQty: number = 0;
  submitted = false;

  constructor(private activeModal: NgbActiveModal,
              private productService: ProductService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private cartService: CartService,
              private miniCartToggle: ToggleminicartService) {
    this.addToCartForm = this.formBuilder.group({
      qty: [0, [Validators.required, Validators.min(1), Validators.max(1)]]
    });
  }

  get f(): any { return this.addToCartForm?.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.addToCartForm.invalid) {
      if(this.f.qty?.value > this.maxQty){
        this.alertService.showWarning('Excede la cantidad máxima para este producto');
      }
      return;
    }
    this.createRequestAddToCart();
    let cart = localStorage.getItem('cart');
    if (!cart) {
      this.authService.getANewCartForProfile();
    }
    this.cartService.addProductToCart(this.addToCartRequest).subscribe({
      next: value => {
        this.alertService.showSuccess('Producto agregado al carrito');
        this.closeModal('producto agregado al carrito');
        this.miniCartToggle.setToggleMiniCart(true);
      },
      error: err => {
        if(err.error.error){
          this.alertService.showDanger(err.error.error);
        }
        else{
          this.alertService.showDanger('Ocurrio un problema tratando de agregar el producto al carrito');
        }
      }
    });
  }

  private createRequestAddToCart() {
    this.addToCartRequest = {
      cartId: this.cart?.id,
      qty: this.f.qty.value,
      productId: this.productId,
      buyerId: this.getBuyerId()
    }
  }

  getBuyerId(): number | undefined{
    if(this.authService.isLoggedIn()){
      return this.authService.currentUserProfileValue?.buyer?.id;
    }
    else{
      return this.authService.currentGuestProfileValue?.buyer?.id;
    }
  }

  closeModal(reason: any): any {
    this.activeModal.close(reason);
  }

  getPriceByQtyType(p: Product | undefined): number | undefined {
    if(p && p.price && p.stock && p.stock.initialQuantity){
      return Math.floor((p?.price) / (p?.stock?.initialQuantity));
    }
    return 0;
  }

  calculatePrice(): number {
    let priceByQtyType = this.getPriceByQtyType(this.product);
    if(priceByQtyType && this.f.qty.value > 0){
      return priceByQtyType * this.f.qty.value;
    }
    return 0;
  }

  ngOnInit(): void {
    if(this.productId){
      this.productSubscription = this.productService.getProductById(this.productId).subscribe({
        next: value => {
          this.product = value;
          if(this.product && this.product.stock && this.product.stock.remainingQuantity){
            this.maxQty = this.product.stock.remainingQuantity;
            this.addToCartForm = this.formBuilder.group({
              qty: [0, [Validators.required, Validators.min(1), Validators.max(this.maxQty)]]
            });

          }
        },
        error: err => {
          let errorMsg = 'No se pudo obtener producto, intentalo más tarde';
          if(err?.error?.error){
            errorMsg = err.error.error;
          }
          this.alertService.showDanger(errorMsg);
          this.activeModal.close(errorMsg);
        }
      });
      let cart = localStorage.getItem('cart');
      if(cart){
        this.cart = JSON.parse(cart);
      }
    }
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
