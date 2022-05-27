import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../shared/model/user";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../shared/model/profile";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "../../shared/services/alert/alert.service";
import { BuyerService } from "./buyer.service";
import {CartService} from "../../shared/services/cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = `${environment.apiURL}/user/login-profile`;
  profile : Profile | undefined;
  private currentUserProfileSubject: BehaviorSubject<Profile> | undefined;
  private currentGuestProfileSubject: BehaviorSubject<Profile> | undefined;
  public currentUserProfile: Observable<Profile> | undefined;
  public currentGuestProfile: Observable<Profile> | undefined;

  constructor(private http: HttpClient,
              private router: Router,
              private modalService: NgbModal,
              private alertService: AlertService,
              private buyerService: BuyerService,
              private cartService: CartService) {
    const userProfile = localStorage.getItem('currentUserProfile');
    if(userProfile){
      this.currentUserProfileSubject = new BehaviorSubject<Profile>(JSON.parse(userProfile));
    }
    this.currentUserProfile = this.currentUserProfileSubject?.asObservable();

    const guestProfile = localStorage.getItem('currentGuestProfile');
    if(guestProfile){
      this.currentGuestProfileSubject = new BehaviorSubject<Profile>(JSON.parse(guestProfile));
    }
    this.currentGuestProfile = this.currentGuestProfileSubject?.asObservable();
  }

  public get currentUserProfileValue(): Profile | undefined {
    return this.currentUserProfileSubject?.value;
  }

  public get currentGuestProfileValue(): Profile | undefined {
    return this.currentGuestProfileSubject?.value;
  }

  public isLoggedIn(): boolean {
    return undefined != this.currentUserProfileValue;
  }

  public isThereAGuestUser(): boolean {
    return undefined != this.currentGuestProfile;
  }

  loginUser(user: User): void {
    this.login(user).subscribe({
      next : value => {
        localStorage.setItem('currentUserProfile', JSON.stringify(value));
        this.currentUserProfileSubject?.next(value);
        this.modalService.dismissAll('login');
        window.location.reload();
      },
      error: err => {
        this.alertService.showWarning(err.error.error);
      }
    });
  }

  private login(user: User) : Observable<Profile> {
    return this.http.post<Profile>(this.loginUrl, user);
  }

  public logout(): void {
    localStorage.removeItem('currentUserProfile');
    // @ts-ignore
    this.currentUserProfileSubject?.next(null);
  }

  getAGuestBuyer(): void {
    this.buyerService.getAGuestUser().subscribe({
      next: value => {
        this.profile = {buyer : value};
        localStorage.setItem('currentGuestProfile', JSON.stringify(this.profile));
        this.currentGuestProfileSubject?.next(this.profile);
        if(!localStorage.getItem('cart')){
          this.getANewCartForGuest();
        }
      },
      error: err => {
        this.alertService.showDanger('ocurrió un error tratando de obtener un usuario invitado');
      }
    })
  }

  public getANewCartForGuest() {
    this.cartService.getANewCart(this.profile?.buyer?.id).subscribe({
      next: value => {
        localStorage.setItem('cart', JSON.stringify(value));
      },
      error: err => {
        this.alertService.showDanger('Ocurrió un problema al tratar de crear un guest cart');
      }
    });
  }

}
