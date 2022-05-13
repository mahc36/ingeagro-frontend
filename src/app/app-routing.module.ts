import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedLayoutComponent } from "./layout/logged-layout/logged-layout.component";
import { AuthGuard } from "./auth/guard/auth.guard";
import { ToLoginLayoutComponent } from "./layout/to-login-layout/to-login-layout.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { MyProductsComponent } from "./product/my-products/my-products.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ToLoginGuard } from "./auth/guard/to-login.guard";

// const routes: Routes = [
//   {
//     path: '',
//     component: ToLoginLayoutComponent,
//     canActivate: [ToLoginGuard],
//     children: [
//       {
//         path: '',
//         component: ProductListComponent,
//         canActivate: [ToLoginGuard],
//       }
//     ]
//   },
// ];
const routes: Routes = [
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path: '',
        canActivate: [AuthGuard],
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
