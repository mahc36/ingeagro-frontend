import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ]
})
export class ShareModule {}
