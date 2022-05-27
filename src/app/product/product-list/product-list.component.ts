import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { Product } from "../../shared/model/product";
import { Subscription } from "rxjs";
import { AlertService } from "../../shared/services/alert/alert.service";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddToCartComponent} from "../../cart/components/modal/add-to-cart/add-to-cart.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  closeResult: string | undefined;
  products: Product[] | undefined;
  pSubscription : Subscription | undefined;

  constructor(private productService: ProductService,
              private alertService: AlertService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pSubscription = this.productService.getAllProducts().subscribe({
      next: value => {
        this.products = value;
        // this.products = this.products.filter(p => this.isThereRemainingQty(p));
      },
      error: err => {
        this.alertService.showDanger('ocurrio un problema trayendo todos los productos');
      }
    });
  }

  isThereProducts(): boolean{
    if(this.products && this.products.length){
        return this.products?.length > 0;
    }
    return false;
  }

  getPriceByQtyType(p: Product | undefined): number | undefined {
    if(p && p.price && p.stock && p.stock.initialQuantity){
      return Math.floor((p?.price) / (p?.stock?.initialQuantity));
    }
    return 0;
  }

  showAddToCartModal(productId: number | undefined): void {
    let modalRef: NgbModalRef;
    const options = {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'app-open-modal logout-modal',
      backdropClass: 'light-blue-backdrop',
      size: 'lg',
      centered: true,
      scrollable: true
    };
    modalRef = this.modalService.open(AddToCartComponent, options);
    modalRef.componentInstance.productId = productId;

    modalRef.result.then((result) => {
      this.closeResult = `Cerrado con: ${result}`;
    }, (reason) => {
      this.closeResult = `Cerrado ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Presionando Escape';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Presionando afuera del recuadro';
    } else {
      return  `con: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    if(this.pSubscription){
      this.pSubscription.unsubscribe();
    }
  }

}
