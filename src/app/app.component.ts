import {Component, OnDestroy} from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { AlertService } from "./shared/services/alert/alert.service";
import { ToggleminicartService } from "./cart/services/toggleminicart.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'ingeagro';

  routeSubscription : Subscription | undefined;


  constructor(private router: Router,
              private alertService: AlertService,
              private miniCartService: ToggleminicartService) {
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

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
