import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../../shared/model/product";
import {AuthService} from "../../auth/service/auth.service";
import {Profile} from "../../shared/model/profile";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  profile : Profile | undefined;

  pSubscription : Subscription | undefined;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.profile = this.authService.currentUserProfileValue;
    this.loadAllProducts();
  }

  private loadAllProducts() {
    const sellerId = this.profile?.seller?.id;

    this.pSubscription = this.productService.getAllProductsBySellerId(sellerId).subscribe({
      next: value => {
        this.products = value;
      },
      error: err => {
        alert('Ocurrio un error tratando de obtener los productos');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.pSubscription){
      this.pSubscription.unsubscribe();
    }
  }

}
