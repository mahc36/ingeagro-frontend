import { EventEmitter, Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToggleminicartService {

  toggleMiniCart: EventEmitter<boolean> = new EventEmitter();

  setToggleMiniCart(value: boolean): void {
    this.toggleMiniCart.emit(value);
  }

  get toggleMiniCartStatus(): Observable<boolean> {
    return this.toggleMiniCart.asObservable();
  }

  constructor() { }
}
