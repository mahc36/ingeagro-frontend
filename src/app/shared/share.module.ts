import { NgModule, ModuleWithProviders } from "@angular/core";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CartModule } from "../cart/cart.module";
import { OverlayModule } from '@angular/cdk/overlay';
import { ALERT_CONFIG_TOKEN, defaultAlertConfig } from './services/alert/alert-config';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CartModule,
        OverlayModule,
        BrowserAnimationsModule
    ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    AlertComponent,
    ForbiddenComponent,
    MenuComponent,
    NotFoundComponent
  ]
})
export class ShareModule {

  public static forRoot(config = defaultAlertConfig):
    ModuleWithProviders<any> {
    return {
      ngModule: ShareModule,
      providers: [
        {
          provide: ALERT_CONFIG_TOKEN,
          useValue: { ...defaultAlertConfig, ...config },
        },
      ],
    };
  }


}
