import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { alertAnimations, AlertAnimationState } from "../services/alert/alert-animation";
import { ALERT_CONFIG_TOKEN, AlertConfig, AlertData } from "../services/alert/alert-config";
import { AlertRef } from "../services/alert/alert-ref";
import { AnimationEvent } from "@angular/animations";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [alertAnimations.fadeAlert]
})
export class AlertComponent implements OnInit, OnDestroy {

  animationState: AlertAnimationState = 'default';
  iconType?: string;
  private intervalId?: number;

  constructor(
    readonly data: AlertData,
    readonly ref: AlertRef,
    @Inject(ALERT_CONFIG_TOKEN) public alertConfig: AlertConfig
  ) {
    this.iconType = data.type === 'success' ? 'done' : data.type;
  }

  ngOnInit(): void {
    this.intervalId = setTimeout(() => this.animationState = 'closing',
      this.data?.milliSecondsTimeout ? this.data?.milliSecondsTimeout : 5000 );
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  close(): void {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut = (toState as AlertAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  printData(data: AlertData) : void {
    alert(JSON.stringify(data));
  }

}
