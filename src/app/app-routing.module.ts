import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedLayoutComponent } from "./layout/logged-layout/logged-layout.component";
import { AuthGuard } from "./auth/guard/auth.guard";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { MyProductsComponent } from "./product/my-products/my-products.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {CartSummaryComponent} from "./cart/components/cart-summary/cart-summary.component";
import {CartConfirmationComponent} from "./cart/components/cart-confirmation/cart-confirmation.component";

const routes: Routes = [
  {
    path: '',
    component: LoggedLayoutComponent,
    children : [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'add-product',
        canActivate: [AuthGuard],
        component: AddProductComponent
      },
      {
        path: 'my-products',
        canActivate: [AuthGuard],
        component: MyProductsComponent
      },
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'cart-summary',
        component: CartSummaryComponent,
      },
      {
        path: 'cart-confirmation',
        component: CartConfirmationComponent,
      },
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
