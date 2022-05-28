import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../../shared/model/product";
import {AuthService} from "../../auth/service/auth.service";
import {Profile} from "../../shared/model/profile";
import {Subscription} from "rxjs";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddToCartComponent} from "../../cart/components/modal/add-to-cart/add-to-cart.component";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  profile : Profile | undefined;
  closeResult: string | undefined;

  pSubscription : Subscription | undefined;

  constructor(private productService: ProductService,
              private authService: AuthService,
              private modalService: NgbModal,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.profile = this.authService.currentUserProfileValue;
    this.loadAllProducts();
  }

  removeProduct(productId: number | undefined): void {
    if(!productId){
      return;
    }
   this.productService.removeProduct(productId).subscribe({
     next: value => {
       this.alertService.showSuccess('Producto eliminado con éxito');
       this.loadAllProducts();
     },
     error: err => {
       this.alertService.showDanger('Ocurrió un problema al tratar de eliminar un producto');
     }
   })
  }

  showEditProductModal(productId: number | undefined): void {
    let modalRef: NgbModalRef;
    const options = {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'app-open-modal logout-modal',
      backdropClass: 'light-blue-backdrop',
      size: 'lg',
      centered: true,
      scrollable: true
    };
    modalRef = this.modalService.open(EditProductComponent, options);
    modalRef.componentInstance.productId = productId;

    modalRef.result.then((result) => {
      this.closeResult = `Cerrado con: ${result}`;
      this.loadAllProducts();
    }, (reason) => {
      this.loadAllProducts();
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

  areThereProducts(): boolean {
    if(this.products && this.products.length > 0){
      return true;
    }
    return false;
  }

  //TODO . this logic should be retrieved from backend
  isSold(p: Product): boolean {
    if(p && p.stock){
      return p.stock.remainingQuantity == 0;
    }
    return false;
  }

  getPriceByQtyType(p: Product | undefined): number | undefined {
    if(p && p.price && p.stock && p.stock.initialQuantity){
      return Math.floor((p?.price) / (p?.stock?.initialQuantity));
    }
    return 0;
  }

  private loadAllProducts() {
    const sellerId = this.profile?.seller?.id;

    this.pSubscription = this.productService.getAllProductsBySellerId(sellerId).subscribe({
      next: value => {
        this.products = value;
      },
      error: err => {
        this.alertService.showDanger('Ocurrio un error tratando de obtener los productos');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.pSubscription){
      this.pSubscription.unsubscribe();
    }
  }

}
