import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../../../../product/services/product.service";
import { Product } from "../../../../shared/model/product";
import { Subscription } from "rxjs";
import { AlertService } from "../../../../shared/services/alert/alert.service";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  @Input() productId: number | undefined;
  product: Product | undefined;
  productSubscription : Subscription | undefined;

  constructor(private activeModal: NgbActiveModal,
              private productService: ProductService,
              private alertService: AlertService) { }

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
