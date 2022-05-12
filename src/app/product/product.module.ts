import {NgModule} from "@angular/core";
import { AddProductComponent } from "./add-product/add-product.component";
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AddProductComponent, MyProductsComponent, ProductListComponent],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductModule{

}
