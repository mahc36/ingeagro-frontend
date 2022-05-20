import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedLayoutComponent } from "./layout/logged-layout/logged-layout.component";
import { AuthGuard } from "./auth/guard/auth.guard";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { MyProductsComponent } from "./product/my-products/my-products.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";

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
      }
    ]
  },
  {path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
