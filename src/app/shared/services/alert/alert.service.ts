import { Inject, Injectable, Injector } from '@angular/core';
import { AlertRef } from "./alert-ref";
import { Overlay } from "@angular/cdk/overlay";
import { ALERT_CONFIG_TOKEN, AlertConfig, AlertData } from "./alert-config";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { AlertComponent } from "../../alert/alert.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private lastAlert?: AlertRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(ALERT_CONFIG_TOKEN) private alertConfig: AlertConfig
  ) { }

  showWarning(text: string): AlertRef {
    return this.show({type: "warning", text})
  }

  showDanger(text: string): AlertRef {
    return this.show({type: "danger", text})
  }

  showInfo(text: string): AlertRef {
    return this.show({type: "info", text})
  }

  showSuccess(text: string): AlertRef {
    return this.show({type: "success", text})
  }

  show(data: AlertData): AlertRef {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new AlertRef(overlayRef);
    this.lastAlert = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(AlertComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getPositionStrategy(): any {
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(this.alertConfig?.position?.right + 'px');
  }

  getPosition(): any {
    const lastToastIsVisible = this.lastAlert && this.lastAlert.isVisible();
    const position = lastToastIsVisible
      ? this.lastAlert?.getPosition().bottom
      : this.alertConfig?.position?.top;

    return position + 'px';
  }

  getInjector(data: AlertData, alertRef: AlertRef, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();

    tokens.set(AlertData, data);
    tokens.set(AlertRef, alertRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
