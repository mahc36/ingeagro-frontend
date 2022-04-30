import { NgModule } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ]
})
export class ShareModule {}
