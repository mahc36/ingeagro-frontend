import { InjectionToken, TemplateRef } from '@angular/core';

export class AlertData {
  type?: AlertType;
  text?: string;
  milliSecondsTimeout?: number;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export type AlertType = 'warning' | 'info' | 'success' | 'danger';

export interface AlertConfig {
  position?: {
    top: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const defaultAlertConfig: AlertConfig = {
  position: {
    top: 20,
    right: 20,
  },
  animation: {
    fadeOut: 1500,
    fadeIn: 300,
  },
};

export const ALERT_CONFIG_TOKEN = new InjectionToken('alert-config');
