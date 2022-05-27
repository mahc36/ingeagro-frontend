import {Component, OnDestroy, OnInit} from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { AlertService } from "./shared/services/alert/alert.service";
import { ToggleminicartService } from "./cart/services/toggleminicart.service";
import { Subscription } from "rxjs";
import { AuthService } from "./auth/service/auth.service";
import { CartService } from "./shared/services/cart/cart.service";
import { Profile } from "./shared/model/profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ingeagro';

  routeSubscription : Subscription | undefined;

  constructor(private router: Router,
              private alertService: AlertService,
              private miniCartService: ToggleminicartService,
              private authService: AuthService) {
    this.lookAtRouter();
  }

  private lookAtRouter() {
    this.routeSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.miniCartService.setToggleMiniCart(false);
        // this.loadingService.startLoading();
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // this.loadingService.stopLoading();
      }

      if (event instanceof NavigationError) {
        this.alertService.showDanger('Ha ocurrido un error');
      }
    });
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn() && !this.authService.isThereAGuestUser()){
      this.authService.getAGuestBuyer();
    }
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
