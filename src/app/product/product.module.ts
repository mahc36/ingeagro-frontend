import {NgModule} from "@angular/core";
import { AddProductComponent } from "./add-product/add-product.component";
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ProductImageComponent } from './product-image/product-image.component';

@NgModule({
  declarations: [AddProductComponent, MyProductsComponent, ProductListComponent, ProductImageComponent],
  exports: [
    ProductImageComponent
  ],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductModule{

}
