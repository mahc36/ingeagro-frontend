import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CartModule} from "../cart/cart.module";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CartModule
    ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ]
})
export class ShareModule {}
