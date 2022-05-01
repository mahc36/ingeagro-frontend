import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {CommonModule} from "@angular/common";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ]
})
export class ShareModule {}
