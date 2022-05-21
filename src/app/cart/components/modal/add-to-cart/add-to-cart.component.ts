import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../../../../product/services/product.service";
import { Product } from "../../../../shared/model/product";
import { Subscription } from "rxjs";
import { AlertService } from "../../../../shared/services/alert/alert.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  @Input() productId: number | undefined;
  product: Product | undefined;
  productSubscription : Subscription | undefined;

  addToCartForm: FormGroup;
  maxQty: number = 0;
  submitted = false;

  constructor(private activeModal: NgbActiveModal,
              private productService: ProductService,
              private alertService: AlertService,
              private formBuilder: FormBuilder) {
    this.addToCartForm = this.formBuilder.group({
      qty: [0, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  get f(): any { return this.addToCartForm?.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.addToCartForm.invalid) {
      return;
    }
    alert('ITs going to add something here');
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
          this.alertService.showDanger(err.error.error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
