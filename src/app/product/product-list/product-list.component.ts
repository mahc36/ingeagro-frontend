import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../../shared/model/product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] | undefined;
  pSubscription : Subscription | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.pSubscription = this.productService.getAllProducts().subscribe({
      next: value => {
        this.products = value;
      },
      error: err => {
        alert("ocurrio un problema trayendo todos los productos");
      }
    });
  }

  ngOnDestroy(): void {
    if(this.pSubscription){
      this.pSubscription.unsubscribe();
    }
  }



}
