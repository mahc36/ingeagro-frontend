import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../shared/model/user";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../shared/model/profile";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../shared/services/alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = `${environment.apiURL}/user/login-profile`;

  private currentUserProfileSubject: BehaviorSubject<Profile> | undefined;
  public currentUserProfile: Observable<Profile> | undefined;

  constructor(private http: HttpClient,
              private router: Router,
              private modalService: NgbModal,
              private alertService: AlertService) {
    const userProfile = localStorage.getItem('currentUserProfile');
    if(userProfile){
      this.currentUserProfileSubject = new BehaviorSubject<Profile>(JSON.parse(userProfile));
    }
    this.currentUserProfile = this.currentUserProfileSubject?.asObservable();
  }

  public get currentUserProfileValue(): Profile | undefined {
    return this.currentUserProfileSubject?.value;
  }

  public isLoggedIn(): boolean {
    return undefined != this.currentUserProfileValue;
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
        this.alertService.show({
          type: "danger",
          text: err.error.error
        })
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

}
