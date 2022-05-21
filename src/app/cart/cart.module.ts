import { NgModule } from "@angular/core";
import { MinicartComponent } from './components/minicart/minicart.component';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AddToCartComponent } from './components/modal/add-to-cart/add-to-cart.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
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
