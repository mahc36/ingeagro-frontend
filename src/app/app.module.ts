import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from "./user/user.module";
import { ShareModule } from "./shared/share.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { LoggedLayoutComponent } from './layout/logged-layout/logged-layout.component';
import { ToLoginLayoutComponent } from './layout/to-login-layout/to-login-layout.component';
import { ProductModule } from "./product/product.module";
import { NotFoundComponent } from './http/not-found/not-found.component';
import {CartModule} from "./cart/cart.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoggedLayoutComponent,
    ToLoginLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UserModule,
    ShareModule.forRoot(),
    HttpClientModule,
    AuthModule,
    ProductModule,
    CartModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
