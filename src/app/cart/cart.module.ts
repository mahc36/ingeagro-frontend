import { NgModule } from "@angular/core";
import { MinicartComponent } from './minicart/minicart.component';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    exports: [
        MinicartComponent
    ],
    declarations: [
        MinicartComponent
    ]
})
export class CartModule{

}
