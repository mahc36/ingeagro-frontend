import { NgModule } from "@angular/core";
import { MinicartComponent } from './components/minicart/minicart.component';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AddToCartComponent } from './components/modal/add-to-cart/add-to-cart.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
    exports: [
        MinicartComponent
    ],
    declarations: [
        MinicartComponent,
        AddToCartComponent
    ]
})
export class CartModule{

}
